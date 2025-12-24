from fastapi import APIRouter
from app.api.endpoints import studies

api_router = APIRouter()
api_router.include_router(studies.router, prefix="/studies", tags=["studies"])
