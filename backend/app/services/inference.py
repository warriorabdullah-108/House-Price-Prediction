import logging
from pathlib import Path
from typing import Optional

import joblib
import numpy as np
import pandas as pd

logger = logging.getLogger(__name__)

_model = None


class ModelNotLoadedError(RuntimeError):
    """Raised if a prediction is attempted before the model has been loaded."""


def load_model(model_path: str) -> None:
    """
    Load the trained sklearn Pipeline once during FastAPI startup.
    """
    global _model

    path = Path(model_path)
    if not path.exists():
        raise FileNotFoundError(
            f"Model file not found at '{path}'. "
            "Copy house_price.pkl into this path or update MODEL_PATH."
        )

    logger.info("Loading model from %s", path)
    _model = joblib.load(path)
    logger.info("Model loaded successfully.")


def get_model():
    if _model is None:
        raise ModelNotLoadedError(
            "Model has not been loaded yet. Is the application still starting?"
        )
    return _model


def predict(features: pd.DataFrame) -> float:
    """
    Predict house price.

    The notebook was trained on:

        y = np.log1p(price)

    Therefore model.predict() returns log(price).

    We convert it back using np.expm1().
    """

    model = get_model()

    prediction_log = model.predict(features)[0]

    prediction_price = np.expm1(prediction_log)

    return float(prediction_price)


def reset_model_for_testing(model: Optional[object] = None) -> None:
    """
    Testing helper.
    """
    global _model
    _model = model