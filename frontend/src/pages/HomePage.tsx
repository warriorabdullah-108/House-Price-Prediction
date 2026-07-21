import React from 'react';
import PredictionForm from '../components/PredictionForm';
import './HomePage.css';

export function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section بالخلفية الكاملة */}
      <div className="full-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            {/* تم حذف اسم Funda */}
            
            <h1>Find Your Dream<br />Home</h1>
            <p>Stop guessing. Get the exact market value of your property instantly.</p>
            <div className="hero-buttons">
              <button className="btn-primary">Calculate Now</button>
              <button className="btn-secondary">Explore</button>
            </div>
          </div>
        </div>
      </div>

      {/* باقي قسم الفورم */}
      <div className="features-section">
        <h2>What we analyze</h2>
        <p className="subtitle">Property features that affect the price</p>
        
        <PredictionForm />
      </div>
    </div>
  );
}

export default HomePage;