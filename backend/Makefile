.PHONY: help install dev up down shell test lint clean

help:
	@echo "Comandos disponibles:"
	@echo "  make install    - Instalar dependencias"
	@echo "  make dev        - Iniciar servidor en modo desarrollo"
	@echo "  make up         - Levantar servicios con Docker Compose"
	@echo "  make down       - Detener servicios Docker"
	@echo "  make shell      - Abrir shell en contenedor web"
	@echo "  make test       - Ejecutar tests"
	@echo "  make lint       - Ejecutar linters"

install:
	pip install -r requirements.txt

dev:
	uvicorn main:app --reload --host $${HOST:-0.0.0.0} --port $${PORT:-8000}

up:
	docker-compose up --build

down:
	docker-compose down

test:
	PYTHONPATH=. pytest tests/ -v

lint:
	flake8 app/
