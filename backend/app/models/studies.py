from sqlalchemy import Column, Integer, String
from app.db.base import Base


class Studies(Base):
    __tablename__ = "studies"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    patient_name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    status = Column(String, nullable=False)
