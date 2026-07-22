import PredictionForm from "../components/PredictionForm";
import "./EstimatePage.css";

export default function EstimatePage() {
  return (
    <div className="panel panel--wide">
      <div className="panel__header">
        <span className="panel__eyebrow">Property details</span>
        <h1 className="panel__title">What's this property worth?</h1>
        <p className="panel__subtitle">
          Fill in the listing's details below. The model reads them the same way it reads every
          record in the training set, and returns a market estimate in rupees.
        </p>
      </div>
      <div className="panel__body">
        <PredictionForm />
      </div>
    </div>
  );
}
