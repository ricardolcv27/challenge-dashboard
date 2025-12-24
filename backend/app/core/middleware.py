import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
from app.core.errors import AppError

logger = logging.getLogger(__name__)


class LoggingMiddleware(BaseHTTPMiddleware):
    """middleware para registrar todas las peticiones http"""

    async def dispatch(self, request: Request, call_next):
        # log request
        logger.info(f"REQUEST: {request.method} {request.url.path}")

        # procesar request
        response = await call_next(request)

        # log response
        logger.info(
            f"RESPONSE: {request.method} {request.url.path} "
            f"[{response.status_code}]"
        )

        return response


class ErrorHandlerMiddleware(BaseHTTPMiddleware):
    #Middleware para capturar y manejar errores
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except AppError as error:
            logger.error(f"AppException: {error.message} [{error.code}]")
            return JSONResponse(
                status_code=error.code,
                content=error.to_dict()
            )
        except Exception as error:
            #error generico
            logger.error(f"Unhandled exception: {str(error)}")
            return JSONResponse(
                status_code=500,
                content={
                    "code": 500,
                    "type": "INTERNAL_SERVER_ERROR",
                    "message": "Error interno del servidor"
                }
            )


def setup_middlewares(app: FastAPI):
    """configura todos los middlewares de la app"""

    app.add_middleware(ErrorHandlerMiddleware)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # TODO: luego cambiar por la direccion
        allow_credentials=True,
        allow_methods=["GET", "POST"],
        allow_headers=["*"],
    )

    # log
    app.add_middleware(LoggingMiddleware)
