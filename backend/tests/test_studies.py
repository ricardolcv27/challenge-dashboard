import pytest
from httpx import AsyncClient
from app.crud.studies import create_studies
from app.schemas.studies import StudiesCreate


@pytest.mark.asyncio
async def test_create_study_success(client: AsyncClient):
    response = await client.post(
        "/studies",
        json={
            "patient_name": "Juan Pérez",
            "type": "Rayos X",
            "status": "pendiente"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["patient_name"] == "Juan Pérez"
    assert data["type"] == "Rayos X"
    assert data["status"] == "pendiente"
    assert "id" in data


@pytest.mark.asyncio
async def test_create_study_bad_request_missing_field(client: AsyncClient):
    response = await client.post(
        "/studies",
        json={
            "patient_name": "Juan Pérez",
            "type": "Rayos X"
            # falta el campo status
        }
    )

    assert response.status_code == 400
    data = response.json()
    assert data["code"] == 400
    assert data["type"] == "BAD_REQUEST"
    assert "Error en el input del request" in data["message"]


@pytest.mark.asyncio
async def test_create_study_bad_request_invalid_field(client: AsyncClient):
    response = await client.post(
        "/studies",
        json={
            "patient_name": "Juan Pérez",
            "tpe": "Rayos X",  # campo tpe en lugar de type
            "status": "pendiente"
        }
    )
    assert response.status_code == 400
    data = response.json()
    assert data["code"] == 400
    assert data["type"] == "BAD_REQUEST"


@pytest.mark.asyncio
async def test_get_studies_empty_database(client: AsyncClient):
    response = await client.get("/studies")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 0


@pytest.mark.asyncio
async def test_get_studies_with_data(client: AsyncClient, db_session):
    # insertar estudios
    study1 = StudiesCreate(
        patient_name="María García",
        type="Tomografía",
        status="completado"
    )
    study2 = StudiesCreate(
        patient_name="Pedro López",
        type="Resonancia",
        status="completado"
    )
    
    await create_studies(db_session, study1)
    await create_studies(db_session, study2)
    
    #asserts
    response = await client.get("/studies")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 2
    
    patient_names = [study["patient_name"] for study in data]
    assert "María García" in patient_names
    assert "Pedro López" in patient_names

@pytest.mark.asyncio
async def test_get_studies_pagination(client: AsyncClient, db_session):
    # insertar estudios
    for i in range(15):
        study = StudiesCreate(
            patient_name=f"Paciente {i+1}",
            type="Rayos X",
            status="pendiente" if i % 2 == 0 else "completado"
        )
        await create_studies(db_session, study)
    
    # obtener primera pagina
    response = await client.get("/studies?offset=0&limit=5")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 5
    assert data[0]["patient_name"] == "Paciente 1"
    assert data[4]["patient_name"] == "Paciente 5"
    
    # obtener segunda pagina
    response = await client.get("/studies?offset=5&limit=5")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 5
    assert data[0]["patient_name"] == "Paciente 6"
    assert data[4]["patient_name"] == "Paciente 10"
    
    # obtener tercera pagina
    response = await client.get("/studies?offset=10&limit=5")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 5
    assert data[0]["patient_name"] == "Paciente 11"
    assert data[4]["patient_name"] == "Paciente 15"


@pytest.mark.asyncio
async def test_get_studies_metrics_with_data(client: AsyncClient, db_session):
    # insertar estudios
    study1 = StudiesCreate(
        patient_name="Ana Torres",
        type="Ecografía",
        status="pendiente"
    )
    study2 = StudiesCreate(
        patient_name="Luis Fernández",
        type="Análisis de Sangre",
        status="completado"
    )
    study3 = StudiesCreate(
        patient_name="Carmen Ruiz",
        type="Rayos X",
        status="pendiente"
    )
    
    await create_studies(db_session, study1)
    await create_studies(db_session, study2)
    await create_studies(db_session, study3)
    
    #asserts
    response = await client.get("/studies/metrics")
    assert response.status_code == 200
    data = response.json()
    
    assert data["total"] == 3
    assert data["pending"] == 2
    assert data["completed"] == 1

@pytest.mark.asyncio
async def test_get_studies_metrics_empty_database(client: AsyncClient):
    response = await client.get("/studies/metrics")
    assert response.status_code == 200
    data = response.json()
    
    assert data["total"] == 0
    assert data["pending"] == 0
    assert data["completed"] == 0