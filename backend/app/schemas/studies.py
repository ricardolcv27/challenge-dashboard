from enum import Enum
from pydantic import BaseModel, ConfigDict, Field


class StudyType(str, Enum):
    TOMOGRAFIA = "Tomografía"
    RESONANCIA = "Resonancia"
    RAYOS_X = "Rayos X"
    ECOGRAFIA = "Ecografía"
    ANALISIS_SANGRE = "Análisis de Sangre"


class StudyStatus(str, Enum):
    PENDING = "pendiente"
    COMPLETED = "completado"


class StudiesCreate(BaseModel):
    patient_name: str = Field(..., min_length=1,
                              max_length=200,
                              description="Nombre del paciente")
    type: StudyType = Field(..., description="Tipo de estudio médico")
    status: StudyStatus = Field(..., description="Estado del estudio")


class StudiesRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    patient_name: str
    type: str
    status: str


class StudiesMetrics(BaseModel):
    total: int
    pending: int
    completed: int
