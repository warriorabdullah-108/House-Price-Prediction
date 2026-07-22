<img width="602" height="145" alt="WhatsApp Image 2026-07-22 at 10 48 23 PM" src="https://github.com/user-attachments/assets/c38c6290-fdf3-4721-9dfa-da7d24246d5f" />
# 🏡 House Price Estimator

A full-stack Machine Learning web application that predicts residential property prices using a trained regression model.

The project covers the complete Machine Learning workflow:

- Data Analysis (EDA)
- Data Cleaning & Feature Engineering
- Model Training & Evaluation
- Model Export
- FastAPI Backend
- React + TypeScript Frontend
- End-to-End Deployment Ready

---

# Team Members

| Name | GitHub |
|-------|---------|
| Khaled Magdy Ismail Ismail | https://github.com/khaled-magdy111 |
| Abdullah Mohamed Saad Hassan | https://github.com/warriorabdullah-108 |
| Sohaila Hosny Saeed Morsi | https://github.com/hosnysohaila9-dev |

---

# Project Overview

This application predicts the selling price of a residential property based on several property characteristics such as:

- Location
- Carpet Area
- Floor Number
- Bathrooms
- Balconies
- Furnishing Status
- Transaction Type
- Ownership Type
- Facing Direction

The prediction is generated using a Machine Learning Regression model served through a FastAPI REST API and displayed inside a modern React web interface.

---

# Project Architecture

```
                    User
                      │
                      ▼
            React + TypeScript
                      │
         HTTP POST /predict
                      │
                      ▼
              FastAPI Backend
                      │
          Load house_price.pkl
                      │
                      ▼
        Scikit-Learn Regression Model
                      │
                      ▼
           Predicted House Price
                      │
                      ▼
            React Result Screen
```

---

# Tech Stack

## Machine Learning

- Python
- Pandas
- NumPy
- Matplotlib
- Scikit-Learn
- Joblib

---

## Backend

- FastAPI
- Uvicorn
- Pydantic

---

## Frontend

- React
- TypeScript
- Vite
- React Router
- CSS

---

# Project Structure

```
House-Price-Estimator/

│
├── Backend/
│   ├── app/
│   ├── models/
│   ├── requirements.txt
│   ├── .env.example
│   └── main.py
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env.example
│   └── vite.config.ts
│
├── Notebooks/
│   └── house_price_model.ipynb
│
├── screenshots/
│
├── README.md
│
└── .gitignore
```

---

# Dataset

Dataset used:

## House Price Prediction Dataset

https://www.kaggle.com/datasets/meetnagadia/house-price-prediction

---

## Download

Download the dataset manually from Kaggle.

After downloading:

```
Notebooks/
    House_Price.csv
```

The raw dataset is intentionally **not included** in this repository because of its size.

---

# Machine Learning Pipeline

The notebook performs:

- Exploratory Data Analysis (EDA)
- Missing Value Handling
- Duplicate Removal
- Feature Selection
- Encoding Categorical Features
- Train/Test Split
- Model Training
- Model Evaluation
- Export trained model

---

# Models Compared

The following regression models were evaluated:

- Linear Regression
- Random Forest Regressor
- XGBoost Regressor

---

# Model Performance

| Model | MAE | RMSE | R² |
|------|------:|------:|------:|
| Linear Regression | 1.18e9 | 2.17e11 | -3.06e8 |
| Random Forest ⭐ | 9.20e5 | 3.24e6 | **0.9316** |
| XGBoost | 1.76e6 | 4.15e6 | 0.8878 |

### Selected Model

✅ Random Forest Regressor

because it achieved the best overall performance on the testing dataset.

---

# Backend Setup

## Navigate

```bash
cd Backend
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run server

```bash
uvicorn app.main:app --reload
```

API

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Navigate

```bash
cd Frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Build

```bash
npm run build
```

---

# Environment Variables

## Backend

Create

```
.env
```

Example

| Variable | Value |
|-----------|-------|
| MODEL_PATH | models/house_price.pkl |

---

## Frontend

Create

```
.env
```

Example

| Variable | Value |
|-----------|-------|
| VITE_API_URL | http://127.0.0.1:8000 |

---

# API Reference

## Health Check

```
GET /health
```

Response

```json
{
  "status": "healthy"
}
```

---

## Predict Price

```
POST /predict
```

Example Request

```json
{
  "location":"new-delhi",
  "carpet_area_sqft":5000,
  "floor_num":7,
  "bathroom":2,
  "balcony":3,
  "furnishing":"Furnished",
  "transaction":"Resale",
  "ownership":"Freehold",
  "facing":"East"
}
```

Example curl

```bash
curl -X POST http://127.0.0.1:8000/predict \
-H "Content-Type: application/json" \
-d '{
"location":"new-delhi",
"carpet_area_sqft":5000,
"floor_num":7,
"bathroom":2,
"balcony":3,
"furnishing":"Furnished",
"transaction":"Resale",
"ownership":"Freehold",
"facing":"East"
}'
```

Example Response

```json
{
    "predicted_price":33505264
}
```

---

# Screenshots

## Landing Page

![Landing Page](screenshots/home.png)

---

## Prediction Form

![Prediction Form](screenshots/form.png)

---

## Filled Form

![Filled Form](screenshots/form-filled.png)

---

## Prediction Result

![Prediction Result](screenshots/result.png)

---

# Features

- Modern UI
- Responsive Design
- FastAPI REST API
- React + TypeScript Frontend
- Random Forest Regression Model
- End-to-End Prediction Pipeline
- Input Validation
- Automatic API Documentation
- Clean Project Structure

---

# Future Improvements

- Docker Support
- Model Retraining Pipeline
- CI/CD
- Cloud Deployment
- User Authentication
- Prediction History
- Interactive Charts

---

# Repository

GitHub Repository

https://github.com/warriorabdullah-108/Test-Team

---

# License

This project was developed for educational purposes as part of the Machine Learning course project.
