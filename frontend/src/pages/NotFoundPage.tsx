import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="deed">
      <div className="deed__header">
        <span className="deed__eyebrow">Record not found</span>
        <h1 className="deed__title">There's nothing filed at this address</h1>
        <p className="deed__subtitle">
          The page you're looking for doesn't exist. Head back and estimate a property instead.
        </p>
      </div>
      <div className="deed__body">
        <Link
          to="/"
          style={{
            display: "inline-block",
            fontWeight: 600,
            color: "var(--paper)",
            background: "var(--ink)",
            borderRadius: "3px",
            padding: "0.7rem 1.1rem",
            textDecoration: "none",
          }}
        >
          Back to the estimator
        </Link>
      </div>
    </div>
  );
}
