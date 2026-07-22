import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="hero">
      <span className="hero__icon" aria-hidden="true">
        🏠
      </span>
      <h1 className="hero__title">House Price Estimator</h1>
      <p className="hero__subtitle">
        Tell us about a property — location, size, floor, and a few more details — and get an
        instant, model-based estimate of its market value.
      </p>
      <Link className="hero__cta" to="/estimate">
        Get an estimate
        <span className="hero__cta-arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  );
}
