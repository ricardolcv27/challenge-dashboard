# Challenge Entelai

Para el presente challenge he implementado un monorepo donde contiene al backend y al frontend. Cada uno se encuentra en su respectivo directorio.

Utilice un template creado por mi como base para empezar con el desarrollo del backend y frontend:

- template de fastapi: https://github.com/ricardolcv27/fastapi-lite
- template de react: https://github.com/ricardolcv27/react_template

# Algunos features agregados al enunciado
### Paginacion en el endpoint `GET /studies?offset={offset}&limit={limit}`
Le agregue **paginacion**, por defecto el `offset = 0` y `limit = 5`. Ya que no es una buena practica que un endpoint GetAll devuelva todos los elementos. Ya que puede existir un gran volumen de registros y el sistema puede saturarse al devolver todos en un solo llamado. En este challenge pequeno no ocurre, pero a gran escala la cantidad de elementos devueltos puede convertirse en un problema.

### Agregue el endpoint `GET /studies/metrics`
Devuelve la cantidad de estudios pendientes, completados y totales. No agregue esta informacion al endpoint `GET /studies` ya que estaria rompiendo el contrato de lo que debe de devolver el endpoint `GET /studies` que esta en el enunciado.

# Levantar la app

Se puede levantar usando docker pero igualmente se puede levantar localmente sin necesidad de docker.

## 1. Levantar todo junto en la raiz del repo (con **docker**)

Ubicado en la raiz del repo, ingrese en la terminal

```bash
docker compose up --build
```

Se levanta el backend primero, y cuando este listo, se levanta el front. 

Cuando se haya levantado el frontend, puede ingresar a http://localhost:5173/

## 2. Levantar back y front por separado (con **docker**)
Ingresando primero al directorio de `backend/`, ingrese en la terminal

```bash
docker compose up --build
```

Cuando ya este corriendo el server, dirigase al directorio `frontend/`, ingrese en la terminal 

```bash
docker compose up --build
```
Cuando se haya levantado el frontend, puede ingresar a http://localhost:5173/

## Levantar back y front por separado (en **local**)
Ingresando primero al directorio de `backend/`, ingrese en la terminal

```bash
python3 -m venv .venv
```
```bash
source .venv/bin/activate
```
```bash
pip install -r requirements.txt
```
```bash
uvicorn main:app --reload
```

Cuando ya este corriendo el server, dirigase al directorio `frontend/`, ingrese en la terminal 

```bash
npm install && npm start
```
Cuando se haya levantado el frontend, puede ingresar a http://localhost:5173/

# Consideraciones y mejoras

- Para este challenge utilice una base de datos en memoria (SQLite)
- Como es una aplicacion bastante chica no quise complejizarme con la modelacion de las tablas, y unicamente cree una tabla `studies` con id, nombre del paciente, tipo de estudio y el estado del estudio.
  - **Mejora**: Se podria hacer un mejor modelado para que sea mas escalable. Teniendo una tabla usuario donde esten todos los pacientes, otra tabla para los tipos de estudios especificos que se haran (Rayos X, ecografias, etc) y otra tabla que relacione usuario con tipo de estudio con un feature del estado de dicho estudio.
- Se puede usar Alembic para manejar el tema de las migraciones.
- Agregar CI/CD pipelines.
