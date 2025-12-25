from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from app.models.studies import Studies
from app.schemas.studies import StudiesCreate
from app.core.errors import AppError, ErrorType


async def get_studies(db: AsyncSession) -> list[Studies]:
    try:
        result = await db.execute(select(Studies))
        return result.scalars().all()
    except SQLAlchemyError as e:
        raise AppError(
            code=500,
            error_type=ErrorType.INTERNAL_SERVER_ERROR,
            message=f"Error al obtener estudios de la base de datos: {str(e)}"
        )
    except Exception as e:
        raise AppError(
            code=500,
            error_type=ErrorType.INTERNAL_SERVER_ERROR,
            message=f"Error inesperado: {str(e)}"
        )


async def create_studies(
    db: AsyncSession, studies_in: StudiesCreate
) -> Studies:
    try:
        db_studies = Studies(**studies_in.model_dump())
        db.add(db_studies)
        await db.commit()
        await db.refresh(db_studies)
        return db_studies
    except IntegrityError as e:
        await db.rollback()
        raise AppError(
            code=400,
            error_type=ErrorType.BAD_REQUEST,
            message=f"Error de integridad en la base de datos: {str(e.orig)}"
        )
    except SQLAlchemyError as e:
        await db.rollback()
        raise AppError(
            code=500,
            error_type=ErrorType.INTERNAL_SERVER_ERROR,
            message=f"Error al crear estudio en la base de datos: {str(e)}"
        )
    except Exception as e:
        await db.rollback()
        raise AppError(
            code=500,
            error_type=ErrorType.INTERNAL_SERVER_ERROR,
            message=f"Error inesperado al crear estudio: {str(e)}"
        )
