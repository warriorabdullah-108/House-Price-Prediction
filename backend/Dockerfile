FROM python:3.11-slim

WORKDIR /app

# System deps for scikit-learn / pandas wheels build faster with these present
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY models ./models

ENV MODEL_PATH=models/house_price.pkl \
    LOCATIONS_PATH=models/locations.json \
    CORS_ORIGINS=http://localhost:5173 \
    ENVIRONMENT=production \
    LOG_LEVEL=INFO

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
