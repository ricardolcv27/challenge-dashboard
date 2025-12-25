# Backend - Medical Studies Dashboard

Backend API para gestión de estudios médicos usando FastAPI y SQLite.

Se uso como plantilla base un repo propio: https://github.com/ricardolcv27/fastapi-lite

## Características

- **FastAPI** - Framework web moderno y rápido
- **SQLite** - Base de datos ligera (archivo `studies.db`)
- **SQLAlchemy** - ORM con soporte asíncrono
- **Auto-creación de tablas** - Las tablas se crean automáticamente al iniciar la app
- **Docker + Docker Compose** - Desarrollo containerizado
- **Middlewares** - CORS y logging configurados
- **Pydantic** - Validación automática de datos
- **pytest** - Tests unitarios

## Estructura del proyecto

```
backend/
├── app/
│   ├── main.py              # Punto de entrada + middlewares
│   ├── core/
│   │   ├── config.py        # Configuración (env vars)
│   │   └── middleware.py    # Middlewares CORS y logging
│   ├── db/
│   │   ├── base.py          # Base de SQLAlchemy
│   │   └── session.py       # Engine async + get_session
│   ├── models/              # tablas
│   │   └── studies.py
│   ├── schemas/             # DTOs
│   │   └── studies.py
│   ├── crud/                # Lógica de acceso a datos
│   │   └── studies.py
│   └── api/
│       ├── api.py           # Router principal
│       └── endpoints/
│           └── studies.py   # Endpoints de estudios
├── tests/                   # Tests
│   ├── conftest.py          # Fixtures y configuración
│   └── test_studies.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── Makefile                 # Comandos útiles
├── studies.db               # Base de datos SQLite (auto-generada)
└── .env.example
```

## Inicio rápido

### 1. Clonar y configurar

```bash
# Copiar variables de entorno
cp .env.example .env

# Editar .env si es necesario (opcional)
```

### 2. Levantar con Docker Compose

```bash
docker-compose up --build
```

La API estará en:
- **API**: http://localhost:8000

### 3. Desarrollo local (sin Docker)

```bash
# Crear virtualenv
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate

# Instalar dependencias
make install
# O manualmente: pip install -r requirements.txt

# Levantar servidor
make dev
# O manualmente: uvicorn main:app --reload
```

## Base de datos

### Auto-creación de tablas

Las tablas se crean automaticamente al iniciar la aplicacion gracias a `Base.metadata.create_all` en el startup en `main.py`.

### Resetear la base de datos

Si necesitas empezar de cero:

```bash
# Detener la app
# Borrar la base de datos
rm studies.db
# Reiniciar la app (se recreara denuevo la base de datos)
make dev
```


## Comandos útiles (Makefile)

```bash
make help       # Ver todos los comandos disponibles
make install    # Instalar dependencias
make dev        # Iniciar servidor en desarrollo
make up         # Levantar Docker Compose
make down       # Detener Docker Compose
make clean      # Limpiar archivos generados (cache, db)
make test       # Ejecutar tests
make lint       # Ejecutar linters (flake8 + black)
make shell      # Shell en contenedor Docker
```

## Middlewares configurados

### 1. CORS
Actualmente permite todas las origins (`*`). Para restringir, editar `app/core/middleware.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Cambiar aquí
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

### 2. Logging
Logea todas las peticiones HTTP

## Testing

Los tests usan SQLite en memoria en lugar de PostgreSQL para mayor velocidad y sin dependencias externas.

```bash
# Ejecutar todos los tests
make test

# O directamente con pytest
pytest tests/ -v

# Con coverage
pytest tests/ --cov=app
```

### Estructura de tests

- `tests/conftest.py`: Configuración de fixtures (BD en memoria, cliente HTTP)
- `tests/test_users.py`: Tests de endpoints de usuarios

Los tests son completamente independientes y cada uno usa su propia base de datos limpia.

## Variables de entorno

Copiar `.env.example` a `.env` y ajustar:

```bash
PORT=8000
HOST=0.0.0.0
PUBLIC_URL=http://localhost:8000
```

## Mejoras futuras

- Implementar migraciones con Alembic.
- Cambiar SQLite por PostgreSQL en producción.
- CI/CD pipelines.
