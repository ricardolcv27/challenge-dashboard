from enum import Enum


class ErrorType(str, Enum):
    BAD_REQUEST = "BAD_REQUEST"
    UNAUTHORIZED = "UNAUTHORIZED"
    FORBIDDEN = "FORBIDDEN"
    NOT_FOUND = "NOT_FOUND"
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"


class AppError(Exception):
    def __init__(self, code: int, error_type: ErrorType, message: str):
        self.code = code
        self.type = error_type
        self.message = message
        super().__init__(message)

    def to_dict(self):
        return {
            "code": self.code,
            "type": self.type.value,
            "message": self.message
        }
