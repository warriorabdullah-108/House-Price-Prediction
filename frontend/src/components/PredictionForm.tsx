import React, { useEffect, useState } from "react";
import "./PredictionForm.css";
import { predictPrice, fetchLocations } from "../api/predictionClient";

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    location: "",
    carpetArea: "",
    floorNumber: "",
    bathrooms: "",
    balconies: "",
    furnishing: "Semi-Furnished",
    transactionType: "Resale",
    ownership: "Freehold",
    facing: "East",
  });

  useEffect(() => {
  fetchLocations()
    .then((data) => setLocations(data))
    .catch((err) => console.error(err));
}, []);

 const [locations, setLocations] = useState<string[]>([]);
const [prediction, setPrediction] = useState<number | null>(null);
const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setPrediction(null);

      const result = await predictPrice({
  location: formData.location,
  carpet_area_sqft: Number(formData.carpetArea),
  floor_num: Number(formData.floorNumber),
  bathroom: Number(formData.bathrooms),
  balcony: Number(formData.balconies),
  furnishing: formData.furnishing,
  transaction: formData.transactionType,
  ownership: formData.ownership,
  facing: formData.facing,
});

      console.log("FULL RESPONSE:", JSON.stringify(result));
setPrediction(result.predicted_price);

    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <form className="prediction-form" onSubmit={handleSubmit}>

      <div className="form-group full-width">
        <label htmlFor="location">
          Location <span className="required">*</span>
        </label>

        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        >
          <option value="">Select a location...</option>

{locations.map((loc) => (
  <option key={loc} value={loc}>
    {loc}
  </option>
))}
        </select>
      </div>


      <div className="form-grid">

        <div className="form-group">
          <label>Carpet area (sqft)</label>
          <input
            type="number"
            name="carpetArea"
            value={formData.carpetArea}
            onChange={handleChange}
            placeholder="e.g. 1200"
            required
          />
        </div>


        <div className="form-group">
          <label>Floor number</label>
          <input
            type="number"
            name="floorNumber"
            value={formData.floorNumber}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <label>Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <label>Balconies</label>
          <input
            type="number"
            name="balconies"
            value={formData.balconies}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
  <label>Furnishing</label>
  <select
    name="furnishing"
    value={formData.furnishing}
    onChange={handleChange}
  >
    {["Furnished", "Semi-Furnished", "Unfurnished"].map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
</div>


        <div className="form-group">
  <label>Transaction type</label>
  <select
    name="transactionType"
    value={formData.transactionType}
    onChange={handleChange}
  >
    {["New Property", "Resale"].map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
</div>

        <div className="form-group">
  <label>Ownership</label>
  <select
    name="ownership"
    value={formData.ownership}
    onChange={handleChange}
  >
    {[
      "Freehold",
      "Leasehold",
      "Co-operative Society",
      "Power of Attorney",
      "other",
    ].map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
</div>


        <div className="form-group">
  <label>Facing</label>
  <select
    name="facing"
    value={formData.facing}
    onChange={handleChange}
  >
    {[
      "East",
      "West",
      "North",
      "South",
      "North-East",
      "North-West",
      "South-East",
      "South-West",
      "other",
    ].map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
</div>

</div>


      <button type="submit" className="submit-btn">
        Estimate the price
      </button>


      {prediction !== null && (
        <div className="result">
          Estimated Price: {prediction}
        </div>
      )}


      {error && (
        <div className="error">
          {error}
        </div>
      )}

    </form>
  );
}