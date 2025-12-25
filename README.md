# Challenge Entelai

Para el presente challenge he implementado un monorepo donde contiene al backend y al frontend. Cada uno se encuentra en su respectivo directorio.

Utilice un template creado por mi como base para empezar con el desarrollo del backend y frontend:

- template de fastapi: https://github.com/ricardolcv27/fastapi-lite
- template de react: https://github.com/ricardolcv27/react_template

# Levantar la app

Se puede levantar usando docker pero igualmente se puede levantar localmente sin necesidad de docker.

## 1. Levantar todo junto en la raiz del repo (con **docker**)

Ubicado en la raiz del repo, ingrese en la terminal

```bash
docker compose up --build
```

Se levanta el backend primero, y cuando este listo, se levanta el front. 

Cuando se haya levantado el frontend, puede ingresar a http://localhost:5173/

## 2. Levantar back y fornt por separado (con **docker**)
Ingresando primero al directorio de `backend/`, ingrese en la terminal

```bash
docker compose up --build
```

Cuando ya este corriendo el server, dirigase al directorio `frontend/`, ingrese en la terminal 

```bash
docker compose up --build
```
Cuando se haya levantado el frontend, puede ingresar a http://localhost:5173/

## Levantar back y fornt por separado (en **local**)
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