/**
 * Funcion para realizar peticiones HTTP
 */

const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: HeadersInit;
}

// <T = unknown> indica que el tipo de retorno es generico
// Se puede especificar al llamar a la funcion
export const api = async <T = unknown>(
  endpoint: string,
  options: RequestOptions = { method: 'GET' },
): Promise<T> => {
  const { method, body, headers } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};
