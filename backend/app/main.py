import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.prediction import router as prediction_router
from app.core.config import get_settings
from app.services import inference
from app.utils.logging_config import setup_logging

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Loads the model once when the server starts, not on every request."""
    settings = get_settings()
    setup_logging(settings.log_level)
    logger.info("Starting %s (%s)", settings.app_name, settings.environment)

    inference.load_model(settings.model_path)

    yield  # --- app is running and serving requests here ---

    logger.info("Shutting down %s", settings.app_name)


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        description="Serves the house price regression model trained in the project notebook.",
        version="1.0.0",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(prediction_router)

    return app


app = create_app()
