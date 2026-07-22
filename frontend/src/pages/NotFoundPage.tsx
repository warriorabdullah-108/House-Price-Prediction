import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="panel">
      <div className="panel__header">
        <span className="panel__eyebrow">404</span>
        <h1 className="panel__title">There's nothing here</h1>
        <p className="panel__subtitle">
          The page you're looking for doesn't exist. Head back and estimate a property instead.
        </p>
      </div>
      <div className="panel__body">
        <Link className="nf__cta" to="/">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
