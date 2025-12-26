from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy import func, case
from app.models.studies import Studies
from app.schemas.studies import StudiesCreate, StudiesMetrics, StudyStatus
from app.core.errors import AppError, ErrorType


async def get_studies(db: AsyncSession, offset: int = 0, limit: int = 5) -> list[Studies]:
    try:
        result = await db.execute(
            select(Studies).order_by(Studies.id).offset(offset).limit(limit)
        )
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

async def get_metrics(db: AsyncSession) -> StudiesMetrics:
    try:
        result = await db.execute(
            select(
                func.count().label('total'),
                func.sum(case((Studies.status == StudyStatus.PENDING, 1), else_=0)).label('pending'),
                func.sum(case((Studies.status == StudyStatus.COMPLETED, 1), else_=0)).label('completed')
            )
        )
        row = result.first()

        total = row.total or 0
        pending = row.pending or 0
        completed = row.completed or 0
        
        return StudiesMetrics(
            total=total,
            pending=pending,
            completed=completed
        )
    except SQLAlchemyError as e:
        raise AppError(
            code=500,
            error_type=ErrorType.INTERNAL_SERVER_ERROR,
            message=f"Error al obtener métricas de estudios de la base de datos: {str(e)}"
        )
    except Exception as e:
        raise AppError(
            code=500,
            error_type=ErrorType.INTERNAL_SERVER_ERROR,
            message=f"Error inesperado: {str(e)}"
        )
