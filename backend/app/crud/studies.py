from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.studies import Studies
from app.schemas.studies import StudiesCreate


async def get_studies(db: AsyncSession) -> list[Studies]:
    try:
        result = await db.execute(select(Studies))
        return result.scalars().all()
    except Exception:
        raise


async def create_studies(db: AsyncSession, studies_in: StudiesCreate) -> Studies:
    try:
        db_studies = Studies(**studies_in.model_dump())
        db.add(db_studies)
        await db.commit()
        await db.refresh(db_studies)
        return db_studies
    except Exception:
        await db.rollback()
        raise
