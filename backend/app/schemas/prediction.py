from typing import Literal

from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    """Mirrors `frontend/src/types/prediction.ts` field-for-field."""

    location: str = Field(..., min_length=1, description="Raw location string from the form")
    carpet_area_sqft: float = Field(..., gt=0, description="Carpet area in square feet")
    floor_num: int = Field(..., ge=0, description="0 = ground floor")
    bathroom: int = Field(..., ge=0)
    balcony: int = Field(..., ge=0)
    furnishing: Literal["Furnished", "Semi-Furnished", "Unfurnished"]
    transaction: Literal["New Property", "Resale"]
    ownership: str = Field(..., min_length=1)
    facing: str = Field(..., min_length=1)

    model_config = {
        "json_schema_extra": {
            "example": {
                "location": "Andheri, Mumbai",
                "carpet_area_sqft": 1200,
                "floor_num": 3,
                "bathroom": 2,
                "balcony": 1,
                "furnishing": "Semi-Furnished",
                "transaction": "Resale",
                "ownership": "Freehold",
                "facing": "East",
            }
        }
    }


class PredictionResponse(BaseModel):
    predicted_price: float


class HealthResponse(BaseModel):
    status: str
