from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app.schemas.studies import StudiesCreate, StudiesRead
from app.crud.studies import (
    create_studies as crud_create_studies,
    get_studies as crud_get_studies
)

router = APIRouter()


@router.post("", response_model=StudiesRead)
async def create_studies(
    studies_in: StudiesCreate, db: AsyncSession = Depends(get_session)
):
    return await crud_create_studies(db, studies_in)


@router.get("", response_model=list[StudiesRead])
async def get_all(db: AsyncSession = Depends(get_session)):
    return await crud_get_studies(db)
