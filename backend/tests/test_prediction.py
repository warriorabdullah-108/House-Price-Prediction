from fastapi.testclient import TestClient

from app.main import app
from app.services import inference

VALID_PAYLOAD = {
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


def test_health_returns_ok():
    with TestClient(app) as client:  # triggers the lifespan, so the model loads
        response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict_happy_path_returns_a_price():
    with TestClient(app) as client:
        response = client.post("/predict", json=VALID_PAYLOAD)
    assert response.status_code == 200

    body = response.json()
    assert "predicted_price" in body
    assert isinstance(body["predicted_price"], (int, float))
    assert body["predicted_price"] > 0


def test_predict_rejects_invalid_input():
    invalid_payload = {**VALID_PAYLOAD, "carpet_area_sqft": -50, "furnishing": "Not A Real Option"}

    with TestClient(app) as client:
        response = client.post("/predict", json=invalid_payload)

    assert response.status_code == 422


def test_predict_maps_unknown_location_to_other():
    payload = {**VALID_PAYLOAD, "location": "Somewhere Nobody Has Heard Of"}

    with TestClient(app) as client:
        response = client.post("/predict", json=payload)

    assert response.status_code == 200
    assert response.json()["predicted_price"] > 0


def teardown_module():
    # Leave a clean slate for any other test module that imports app.main.
    inference.reset_model_for_testing(None)
