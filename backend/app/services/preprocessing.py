import json
import logging
from functools import lru_cache
from pathlib import Path

import pandas as pd

from app.schemas.prediction import PredictionRequest

logger = logging.getLogger(__name__)

# Must match the `numeric_features` / `categorical_features` lists used to
# fit the ColumnTransformer in notebooks/house_price_model.ipynb (Phase 2.4).
NUMERIC_FEATURES = [
    "area_sqft",
    "floor_num",
    "bathroom_num",
    "balcony_num",
]
CATEGORICAL_FEATURES = [
    "location_grouped",
    "Furnishing",
    "Transaction",
    "Ownership", 
    "facing",
    ]
ALL_FEATURES = NUMERIC_FEATURES + CATEGORICAL_FEATURES

_UNKNOWN_LOCATION = "other"


@lru_cache
def load_known_locations(locations_path: str) -> frozenset[str]:
    """Loads the location vocabulary exported in Phase 2.6 (locations.json).

    Cached so the file is only read once per process. Falls back to an empty
    set (everything maps to "other") if the file is missing, so the API can
    still start and serve predictions.
    """
    path = Path(locations_path)
    if not path.exists():
        logger.warning("Locations file not found at %s — all locations will map to 'other'.", path)
        return frozenset()

    with path.open(encoding="utf-8") as f:
        locations = json.load(f)
    return frozenset(locations)


def build_feature_frame(request: PredictionRequest, locations_path: str) -> pd.DataFrame:
    """Builds the single-row DataFrame fed into `model.predict(...)`.

    The exported model is a full sklearn Pipeline (imputer + scaler + one-hot
    encoder + regressor), so no manual encoding happens here — we only need
    to hand it a DataFrame with the exact column names it was trained on.
    """
    known_locations = load_known_locations(locations_path)
    location_grouped = request.location if request.location in known_locations else _UNKNOWN_LOCATION

    row = {
        "area_sqft": request.carpet_area_sqft,
        "floor_num": request.floor_num,
        "bathroom_num": request.bathroom,
        "balcony_num": request.balcony,
        "location_grouped": location_grouped,
        "Furnishing": request.furnishing,
        "Transaction": request.transaction,
        "Ownership": request.ownership,
        "facing": request.facing,
    }
    
    return pd.DataFrame([row], columns=ALL_FEATURES)
