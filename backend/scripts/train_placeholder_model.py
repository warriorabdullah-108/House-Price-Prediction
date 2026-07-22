"""
Generates a PLACEHOLDER `models/house_price.pkl` + `models/locations.json` so
the backend is runnable immediately after cloning.

This is NOT the real model. Replace both files with the ones produced by
notebooks/house_price_model.ipynb (Phase 2.6) before submitting the project.

Run once from backend/:
    python scripts/train_placeholder_model.py
"""

import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

NUMERIC_FEATURES = ["carpet_area_sqft", "floor_num", "bathroom", "balcony"]
CATEGORICAL_FEATURES = ["location_grouped", "Furnishing", "Transaction", "Ownership", "facing"]

LOCATIONS = [
    "Andheri, Mumbai",
    "Bandra, Mumbai",
    "Whitefield, Bangalore",
    "Koramangala, Bangalore",
    "Gachibowli, Hyderabad",
    "Banjara Hills, Hyderabad",
    "Sector 62, Noida",
    "Dwarka, Delhi",
    "Salt Lake, Kolkata",
    "Wakad, Pune",
    "Baner, Pune",
    "Anna Nagar, Chennai",
    "OMR, Chennai",
    "other",
]


def make_synthetic_dataset(n_rows: int = 2000, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)

    carpet_area_sqft = rng.uniform(300, 3500, n_rows)
    floor_num = rng.integers(0, 25, n_rows)
    bathroom = rng.integers(1, 5, n_rows)
    balcony = rng.integers(0, 4, n_rows)
    location_grouped = rng.choice(LOCATIONS, n_rows)
    furnishing = rng.choice(["Furnished", "Semi-Furnished", "Unfurnished"], n_rows)
    transaction = rng.choice(["New Property", "Resale"], n_rows)
    ownership = rng.choice(["Freehold", "Leasehold", "Co-operative Society", "Power of Attorney"], n_rows)
    facing = rng.choice(["North", "South", "East", "West"], n_rows)

    # A simple, plausible-ish price so predictions look sane, not real data.
    base_price_per_sqft = 6500
    location_multiplier = pd.Series(location_grouped).map(
        {loc: rng.uniform(0.7, 1.8) for loc in LOCATIONS}
    ).to_numpy()
    price = (
        carpet_area_sqft * base_price_per_sqft * location_multiplier
        + floor_num * 15000
        + bathroom * 80000
        + balcony * 30000
        + rng.normal(0, 150000, n_rows)
    )
    price = np.clip(price, 500000, None)

    return pd.DataFrame(
        {
            "carpet_area_sqft": carpet_area_sqft,
            "floor_num": floor_num,
            "bathroom": bathroom,
            "balcony": balcony,
            "location_grouped": location_grouped,
            "Furnishing": furnishing,
            "Transaction": transaction,
            "Ownership": ownership,
            "facing": facing,
            "price_clean": price,
        }
    )


def main() -> None:
    output_dir = Path(__file__).resolve().parent.parent / "models"
    output_dir.mkdir(exist_ok=True)

    df = make_synthetic_dataset()
    X = df[NUMERIC_FEATURES + CATEGORICAL_FEATURES]
    y = df["price_clean"]

    preprocessor = ColumnTransformer(
        [
            (
                "num",
                Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]),
                NUMERIC_FEATURES,
            ),
            (
                "cat",
                Pipeline(
                    [
                        ("impute", SimpleImputer(strategy="most_frequent")),
                        ("onehot", OneHotEncoder(handle_unknown="ignore")),
                    ]
                ),
                CATEGORICAL_FEATURES,
            ),
        ]
    )

    model = Pipeline(
        [
            ("prep", preprocessor),
            ("reg", RandomForestRegressor(n_estimators=100, random_state=42)),
        ]
    )
    model.fit(X, y)

    model_path = output_dir / "house_price.pkl"
    joblib.dump(model, model_path)
    print(f"Wrote placeholder model to {model_path}")

    locations_path = output_dir / "locations.json"
    json.dump(sorted(LOCATIONS), locations_path.open("w", encoding="utf-8"))
    print(f"Wrote locations list to {locations_path}")


if __name__ == "__main__":
    main()
