import logging
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.api.api import api_router
from app.core.config import Settings
from app.core.middleware import setup_middlewares
from app.core.errors import AppError, ErrorType
from app.db.session import engine
from app.db.base import Base
from app.models.studies import Studies  # Importar todos los modelos

# configurar logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

settings = Settings()
app = FastAPI()

# middlewares
setup_middlewares(app)

# add routers
app.include_router(api_router)


# capturar errores de validacion
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    logger.error(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=400,
        content=AppError(
            code=400,
            error_type=ErrorType.BAD_REQUEST,
            message="Error en el input del request. Verifica los datos enviados."
        ).to_dict(),
    )


# startup
@app.on_event("startup")
async def on_startup():
    logger.info("Starting application...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables created successfully")


# shutdown
@app.on_event("shutdown")
async def on_shutdown():
    logger.info("Shutting down application...")
    await engine.dispose()


# root endpoint
@app.get("/")
async def root():
    return {
        "message": "Hello",
    }
