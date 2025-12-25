from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    PORT: int = 8000
    HOST: str = "0.0.0.0"
    PUBLIC_URL: str = "http://localhost:8000"

    @property
    def database_url(self) -> str:
        """SQLite async URL"""
        return "sqlite+aiosqlite:///./studies.db"

    @property
    def database_url_sync(self) -> str:
        """SQLite sync URL for Alembic"""
        return "sqlite:///./studies.db"
