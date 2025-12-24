from pydantic import BaseModel
from typing import Optional


class StudiesCreate(BaseModel):
    patient_name: str
    type: str
    status: Optional[str] = "pendiente"


class StudiesRead(BaseModel):
    id: int
    patient_name: str
    type: str
    status: str

    class Config:
        orm_mode = True
