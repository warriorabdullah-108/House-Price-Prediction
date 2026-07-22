/**
 * These types mirror `backend/app/schemas/prediction.py` field-for-field.
 * If the backend schema changes, update this file to match.
 */

export type Furnishing = "Furnished" | "Semi-Furnished" | "Unfurnished";
export type Transaction = "New Property" | "Resale";

export interface PredictionRequest {
  location: string;
  carpet_area_sqft: number;
  floor_num: number;
  bathroom: number;
  balcony: number;
  furnishing: Furnishing;
  transaction: Transaction;
  ownership: string;
  facing: string;
}

export interface PredictionResponse {
  predicted_price: number;
}

export interface HealthResponse {
  status: string;
}

/** Field-level validation errors, keyed by PredictionRequest field name. */
export type PredictionFormErrors = Partial<Record<keyof PredictionRequest, string>>;
