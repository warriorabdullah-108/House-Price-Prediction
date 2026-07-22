import React, { useState } from "react";
import "./PredictionForm.css";
import { predictPrice } from "../api/predictionClient";

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
          <option value="location1">Location 1</option>
          <option value="location2">Location 2</option>
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
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Furnished">Furnished</option>
          </select>
        </div>


        <div className="form-group">
          <label>Transaction type</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
          >
            <option value="Resale">Resale</option>
            <option value="New Booking">New Booking</option>
          </select>
        </div>


        <div className="form-group">
          <label>Ownership</label>
          <select
            name="ownership"
            value={formData.ownership}
            onChange={handleChange}
          >
            <option value="Freehold">Freehold</option>
            <option value="Leasehold">Leasehold</option>
          </select>
        </div>


        <div className="form-group">
          <label>Facing</label>
          <select
            name="facing"
            value={formData.facing}
            onChange={handleChange}
          >
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
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