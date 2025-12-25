FROM python:3.11-slim
WORKDIR /usr/src/app
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD uvicorn main:app --reload --host ${HOST:-0.0.0.0} --port ${PORT:-8000}
