# Frontend - Medical Studies Dashboard

Como base se uso un template propio: https://github.com/ricardolcv27/react_template

## Estructura del Proyecto

```
src/
├── assets/          # Archivos estáticos
├── components/      # Componentes reutilizables
├── constants/       # Constantes globales
├── hooks/           # Custom hooks
├── lib/             # Utilidades y funciones helper
├── providers/       # Context providers
├── screens/         # Páginas/vistas principales
├── services/        # Servicios para API
├── styles/          # Estilos CSS y módulos
├── types/           # Definiciones de tipos TypeScript
├── main.tsx         # Punto de entrada
└── router.tsx       # Configuración de rutas
```

# Levantar el front
Se puede levantar usando docker pero igualmente se puede levantar localmente sin necesidad de docker.

## Con docker compose
Cuando ya este corriendo el server, dirigase al directorio `frontend/`, ingrese en la terminal 

```bash
docker compose up --build
```
Cuando se haya levantado el frontend, puede ingresar a http://localhost:5173/

## Local sin docker

Cuando ya este corriendo el server, dirigase al directorio `frontend/`, ingrese en la terminal 

```bash
npm install && npm start
```
Cuando se haya levantado el frontend, puede ingresar a http://localhost:5173/
