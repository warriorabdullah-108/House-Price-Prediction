import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLocations, predictPrice, ApiError } from "../api/predictionClient";
import type {
  Furnishing,
  PredictionFormErrors,
  PredictionRequest,
  Transaction,
} from "../types/prediction";
import "./PredictionForm.css";

const FURNISHING_OPTIONS: Furnishing[] = ["Furnished", "Semi-Furnished", "Unfurnished"];
const TRANSACTION_OPTIONS: Transaction[] = ["New Property", "Resale"];
const OWNERSHIP_OPTIONS = [
  "Freehold",
  "Leasehold",
  "Co-operative Society",
  "Power of Attorney",
  "other",
];
const FACING_OPTIONS = [
  "North",
  "South",
  "East",
  "West",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
];

const initialForm: PredictionRequest = {
  location: "",
  carpet_area_sqft: "" as unknown as number,
  floor_num: "" as unknown as number,
  bathroom: "" as unknown as number,
  balcony: "" as unknown as number,
  furnishing: "Semi-Furnished",
  transaction: "Resale",
  ownership: "Freehold",
  facing: "East",
};

function validate(form: PredictionRequest): PredictionFormErrors {
  const errors: PredictionFormErrors = {};

  if (!form.location) errors.location = "Pick the property's location.";

  if (form.carpet_area_sqft === ("" as unknown as number)) {
    errors.carpet_area_sqft = "Carpet area is required.";
  } else if (Number(form.carpet_area_sqft) <= 0) {
    errors.carpet_area_sqft = "Carpet area must be greater than 0.";
  }

  if (form.floor_num === ("" as unknown as number)) {
    errors.floor_num = "Floor number is required.";
  } else if (Number(form.floor_num) < 0) {
    errors.floor_num = "Floor can't be negative — use 0 for ground floor.";
  }

  if (form.bathroom === ("" as unknown as number)) {
    errors.bathroom = "Number of bathrooms is required.";
  } else if (Number(form.bathroom) < 0) {
    errors.bathroom = "Bathrooms can't be negative.";
  }

  if (form.balcony === ("" as unknown as number)) {
    errors.balcony = "Number of balconies is required.";
  } else if (Number(form.balcony) < 0) {
    errors.balcony = "Balconies can't be negative.";
  }

  return errors;
}

export default function PredictionForm() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState<string[]>([]);
  const [locationsError, setLocationsError] = useState<string | null>(null);

  const [form, setForm] = useState<PredictionRequest>(initialForm);
  const [errors, setErrors] = useState<PredictionFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLocations()
      .then(setLocations)
      .catch(() => setLocationsError("Couldn't load the location list. Refresh the page to retry."));
  }, []);

  function updateField<K extends keyof PredictionRequest>(key: K, value: PredictionRequest[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const result = await predictPrice({
        ...form,
        carpet_area_sqft: Number(form.carpet_area_sqft),
        floor_num: Number(form.floor_num),
        bathroom: Number(form.bathroom),
        balcony: Number(form.balcony),
      });
      navigate("/result", { state: { prediction: result, submitted: form } });
    } catch (err) {
      if (err instanceof ApiError) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Something went wrong while estimating the price. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="pf" onSubmit={handleSubmit} noValidate>
      {submitError && (
        <div className="pf__banner" role="alert">
          {submitError}
        </div>
      )}

      <div className="pf__field">
        <label className="pf__label" htmlFor="location">
          Location <sup>*</sup>
        </label>
        <select
          id="location"
          className="pf__control"
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          aria-invalid={Boolean(errors.location)}
          aria-describedby="location-error"
        >
          <option value="" disabled>
            {locationsError ? "Locations unavailable" : "Select a location…"}
          </option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <span className="pf__error" id="location-error">
          {errors.location ?? locationsError ?? ""}
        </span>
      </div>

      <div className="pf__row">
        <div className="pf__field">
          <label className="pf__label" htmlFor="carpet_area_sqft">
            Carpet area (sqft) <sup>*</sup>
          </label>
          <input
            id="carpet_area_sqft"
            className="pf__control"
            type="number"
            min="1"
            step="1"
            inputMode="decimal"
            placeholder="e.g. 1200"
            value={form.carpet_area_sqft as unknown as string}
            onChange={(e) => updateField("carpet_area_sqft", e.target.value as unknown as number)}
            aria-invalid={Boolean(errors.carpet_area_sqft)}
            aria-describedby="carpet_area_sqft-error"
          />
          <span className="pf__error" id="carpet_area_sqft-error">
            {errors.carpet_area_sqft ?? ""}
          </span>
        </div>

        <div className="pf__field">
          <label className="pf__label" htmlFor="floor_num">
            Floor number <sup>*</sup>
          </label>
          <input
            id="floor_num"
            className="pf__control"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            placeholder="0 = ground floor"
            value={form.floor_num as unknown as string}
            onChange={(e) => updateField("floor_num", e.target.value as unknown as number)}
            aria-invalid={Boolean(errors.floor_num)}
            aria-describedby="floor_num-error"
          />
          <span className="pf__error" id="floor_num-error">
            {errors.floor_num ?? ""}
          </span>
        </div>
      </div>

      <div className="pf__row">
        <div className="pf__field">
          <label className="pf__label" htmlFor="bathroom">
            Bathrooms <sup>*</sup>
          </label>
            <input
              id="bathroom"
              className="pf__control"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              placeholder="e.g. 2"
              value={form.bathroom as unknown as string}
              onChange={(e) => updateField("bathroom", e.target.value as unknown as number)}
              aria-invalid={Boolean(errors.bathroom)}
              aria-describedby="bathroom-error"
            />
          <span className="pf__error" id="bathroom-error">
            {errors.bathroom ?? ""}
          </span>
        </div>

        <div className="pf__field">
          <label className="pf__label" htmlFor="balcony">
            Balconies <sup>*</sup>
          </label>
            <input
              id="balcony"
              className="pf__control"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              placeholder="e.g. 1"
              value={form.balcony as unknown as string}
              onChange={(e) => updateField("balcony", e.target.value as unknown as number)}
              aria-invalid={Boolean(errors.balcony)}
              aria-describedby="balcony-error"
            />
          <span className="pf__error" id="balcony-error">
            {errors.balcony ?? ""}
          </span>
        </div>
      </div>

      <hr className="pf__divider" />

      <div className="pf__row">
        <div className="pf__field">
          <label className="pf__label" htmlFor="furnishing">
            Furnishing
          </label>
          <select
            id="furnishing"
            className="pf__control"
            value={form.furnishing}
            onChange={(e) => updateField("furnishing", e.target.value as Furnishing)}
          >
            {FURNISHING_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="pf__field">
          <label className="pf__label" htmlFor="transaction">
            Transaction type
          </label>
          <select
            id="transaction"
            className="pf__control"
            value={form.transaction}
            onChange={(e) => updateField("transaction", e.target.value as Transaction)}
          >
            {TRANSACTION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pf__row">
        <div className="pf__field">
          <label className="pf__label" htmlFor="ownership">
            Ownership
          </label>
          <select
            id="ownership"
            className="pf__control"
            value={form.ownership}
            onChange={(e) => updateField("ownership", e.target.value)}
          >
            {OWNERSHIP_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="pf__field">
          <label className="pf__label" htmlFor="facing">
            Facing
          </label>
          <select
            id="facing"
            className="pf__control"
            value={form.facing}
            onChange={(e) => updateField("facing", e.target.value)}
          >
            {FACING_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="pf__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting && <span className="pf__spinner" aria-hidden="true" />}
        {isSubmitting ? "Estimating…" : "Estimate the price"}
      </button>
      <span className="pf__hint">Fields marked with * are required.</span>
    </form>
  );
}
