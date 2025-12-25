import pytest
from httpx import AsyncClient


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
    assert response.status_code == 200
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
async def test_get_studies_with_data(client: AsyncClient):
    # insertar estudios
    study1 = {
        "patient_name": "María García",
        "type": "Tomografía",
        "status": "completado"
    }
    study2 = {
        "patient_name": "Pedro López",
        "type": "Resonancia",
        "status": "completado"
    }
    
    await client.post("/studies", json=study1)
    await client.post("/studies", json=study2)
    
    #asserts
    response = await client.get("/studies")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 2
    
    patient_names = [study["patient_name"] for study in data]
    assert "María García" in patient_names
    assert "Pedro López" in patient_names
