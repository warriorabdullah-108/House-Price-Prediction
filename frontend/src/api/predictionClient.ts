import type { HealthResponse, PredictionRequest, PredictionResponse } from "../types/prediction";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API URL =", BASE_URL);

if (!BASE_URL) {
  // Fails loudly at build/dev time rather than silently hitting a relative URL.
  // eslint-disable-next-line no-console
  console.error(
    "VITE_API_BASE_URL is not set. Copy .env.example to .env and restart the dev server."
  );
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Turns FastAPI's error payloads (detail: string | {msg}[]) into one readable line. */
async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json();
    if (typeof body?.detail === "string") return body.detail;
    if (Array.isArray(body?.detail)) {
      return body.detail
        .map((d: { msg?: string; loc?: string[] }) =>
          d.loc ? `${d.loc[d.loc.length - 1]}: ${d.msg}` : d.msg
        )
        .join(", ");
    }
  } catch {
    // response wasn't JSON — fall through to the generic message
  }
  return `Request failed with status ${response.status}`;
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${BASE_URL}/health`);
  if (!response.ok) {
    throw new ApiError(await extractErrorMessage(response), response.status);
  }
  return response.json();
}

export async function predictPrice(
  payload: PredictionRequest
): Promise<PredictionResponse> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError(
      "Could not reach the prediction server. Is the backend running on " + BASE_URL + "?",
      0
    );
  }

  if (!response.ok) {
    throw new ApiError(await extractErrorMessage(response), response.status);
  }

  return response.json();
}

export async function fetchLocations(): Promise<string[]> {
  const response = await fetch("/locations.json");
  if (!response.ok) {
    throw new ApiError("Could not load the list of locations.", response.status);
  }
  return response.json();
}
