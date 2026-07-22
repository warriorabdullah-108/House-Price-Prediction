import logging

from fastapi import APIRouter, HTTPException

from app.core.config import get_settings
from app.schemas.prediction import HealthResponse, PredictionRequest, PredictionResponse
from app.services import inference
from app.services.preprocessing import build_feature_frame

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["health"])
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@router.post("/predict", response_model=PredictionResponse, tags=["prediction"])
def predict(request: PredictionRequest) -> PredictionResponse:
    settings = get_settings()

    try:
        features = build_feature_frame(request, settings.locations_path)
        predicted_price = inference.predict(features)
    except inference.ModelNotLoadedError as exc:
        logger.exception("Prediction attempted before model was loaded.")
        raise HTTPException(status_code=503, detail="Model is not ready yet.") from exc
    except Exception as exc:  # noqa: BLE001 — surface a clean 500 instead of a raw traceback
        logger.exception("Prediction failed for request: %s", request)
        raise HTTPException(status_code=500, detail="Failed to compute a prediction.") from exc

    return PredictionResponse(predicted_price=predicted_price)
