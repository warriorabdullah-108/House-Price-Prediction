import PredictionForm from "../components/PredictionForm";

export default function HomePage() {
  return (
    <div className="deed">
      <div className="deed__header">
        <h1 className="deed__title">What's this property worth?</h1>
        <p className="deed__subtitle">
          Enter the listing's details below. The model reads them the same way it reads every
          record in the training set, and returns a market estimate in rupees.
        </p>
      </div>
      <div className="deed__body">
        <PredictionForm />
      </div>
    </div>
  );
}
