import { Link, Navigate, useLocation } from "react-router-dom";
import type { PredictionRequest, PredictionResponse } from "../types/prediction";
import "./ResultPage.css";

interface ResultState {
  prediction: PredictionResponse;
  submitted: PredictionRequest;
}

/** Formats a rupee amount the way Indian listings are usually read: Lac / Cr. */
function formatRupees(amount: number): string {
  if (amount >= 1e7) return `₹ ${(amount / 1e7).toFixed(2)} Cr`;
  if (amount >= 1e5) return `₹ ${(amount / 1e5).toFixed(2)} Lac`;
  return `₹ ${Math.round(amount).toLocaleString("en-IN")}`;
}

export default function ResultPage() {
  const location = useLocation();
  const state = location.state as ResultState | null;

  if (!state?.prediction) {
    // Someone navigated to /result directly without submitting the form.
    return <Navigate to="/" replace />;
  }

  const { prediction, submitted } = state;

  return (
    <div className="panel">
      <div className="panel__header">
        <span className="panel__eyebrow">Estimate No. 01 — Assessed</span>
        <h1 className="panel__title">Here's the estimate</h1>
        <p className="panel__subtitle">
          Based on the details you entered, the model's best estimate of market value is shown
          below.
        </p>
      </div>
      <div className="panel__body">
        <div className="result__stamp-wrap">
          <div className="result__stamp">
            <span className="result__stamp-label">Assessed value</span>
            <span className="result__stamp-value">{formatRupees(prediction.predicted_price)}</span>
            <span className="result__stamp-sub">
              ₹{Math.round(prediction.predicted_price).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="result__ledger">
          <p className="result__ledger-title">Submitted details</p>
          <dl className="result__ledger-list">
            <div className="result__ledger-row">
              <dt>Location</dt>
              <dd>{submitted.location}</dd>
            </div>
            <div className="result__ledger-row">
              <dt>Carpet area</dt>
              <dd>{submitted.carpet_area_sqft} sqft</dd>
            </div>
            <div className="result__ledger-row">
              <dt>Floor</dt>
              <dd>{submitted.floor_num}</dd>
            </div>
            <div className="result__ledger-row">
              <dt>Bathrooms / Balconies</dt>
              <dd>
                {submitted.bathroom} / {submitted.balcony}
              </dd>
            </div>
            <div className="result__ledger-row">
              <dt>Furnishing</dt>
              <dd>{submitted.furnishing}</dd>
            </div>
            <div className="result__ledger-row">
              <dt>Transaction</dt>
              <dd>{submitted.transaction}</dd>
            </div>
            <div className="result__ledger-row">
              <dt>Ownership</dt>
              <dd>{submitted.ownership}</dd>
            </div>
            <div className="result__ledger-row">
              <dt>Facing</dt>
              <dd>{submitted.facing}</dd>
            </div>
          </dl>
        </div>

        <div className="result__actions">
          <Link className="result__link result__link--primary" to="/estimate">
            Estimate another property
          </Link>
          <Link className="result__link result__link--ghost" to="/">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
