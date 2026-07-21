import React, { useState } from 'react';
import './PredictionForm.css';

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    location: '',
    carpetArea: '',
    floorNumber: '',
    bathrooms: '',
    balconies: '',
    furnishing: 'Semi-Furnished',
    transactionType: 'Resale',
    ownership: 'Freehold',
    facing: 'East'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      {/* Location (Full Width) */}
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

      {/* Grid Fields */}
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="carpetArea">
            Carpet area (sqft) <span className="required">*</span>
          </label>
          <input
            type="number"
            id="carpetArea"
            name="carpetArea"
            placeholder="e.g. 1200"
            value={formData.carpetArea}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="floorNumber">
            Floor number <span className="required">*</span>
          </label>
          <input
            type="number"
            id="floorNumber"
            name="floorNumber"
            placeholder="0 = ground floor"
            value={formData.floorNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bathrooms">
            Bathrooms <span className="required">*</span>
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="balconies">
            Balconies <span className="required">*</span>
          </label>
          <input
            type="number"
            id="balconies"
            name="balconies"
            value={formData.balconies}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="furnishing">Furnishing</label>
          <select id="furnishing" name="furnishing" value={formData.furnishing} onChange={handleChange}>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Furnished">Furnished</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="transactionType">Transaction type</label>
          <select id="transactionType" name="transactionType" value={formData.transactionType} onChange={handleChange}>
            <option value="Resale">Resale</option>
            <option value="New Booking">New Booking</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ownership">Ownership</label>
          <select id="ownership" name="ownership" value={formData.ownership} onChange={handleChange}>
            <option value="Freehold">Freehold</option>
            <option value="Leasehold">Leasehold</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="facing">Facing</label>
          <select id="facing" name="facing" value={formData.facing} onChange={handleChange}>
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
    </form>
  );
}