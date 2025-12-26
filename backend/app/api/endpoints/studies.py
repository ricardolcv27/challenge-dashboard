from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app.schemas.studies import StudiesCreate, StudiesRead, StudiesMetrics
from app.crud.studies import (
    create_studies as crud_create_studies,
    get_studies as crud_get_studies,
    get_metrics as crud_get_metrics,
)

router = APIRouter()


@router.post("", response_model=StudiesRead, status_code=201)
async def create_studies(
    studies_in: StudiesCreate, db: AsyncSession = Depends(get_session)
):
    return await crud_create_studies(db, studies_in)


@router.get("", response_model=list[StudiesRead])
async def get_all(
    offset: int = Query(0, ge=0),
    limit: int = Query(5, ge=1, le=100),
    db: AsyncSession = Depends(get_session)
):
    return await crud_get_studies(db, offset=offset, limit=limit)


@router.get("/metrics", response_model=StudiesMetrics)
async def get_metrics(db: AsyncSession = Depends(get_session)):
    metrics = await crud_get_metrics(db)
    return metrics