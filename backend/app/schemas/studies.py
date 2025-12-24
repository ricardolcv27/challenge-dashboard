from pydantic import BaseModel, ConfigDict
from typing import Optional


class StudiesCreate(BaseModel):
    patient_name: str
    type: str
    status: str


class StudiesRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    patient_name: str
    type: str
    status: str
