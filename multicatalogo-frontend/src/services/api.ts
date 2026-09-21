// Configuración centralizada del cliente API para conectar con el backend Go (Fiber)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
}

export interface ApiErrorResponse {
  error?: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  img: string;
}

/**
 * Realiza la petición de autenticación hacia el endpoint POST /api/login del backend Go.
 */
export const loginApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.error || `Error en el servidor (${response.status})`;
      throw new Error(errorMsg);
    }

    return data as LoginResponse;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('No se pudo conectar con el servidor Go backend (puerto 3000). Verifica que esté encendido.', {
        cause: error,
      });
    }
    throw error;
  }
};

/**
 * Obtiene el catálogo de productos disponibles desde el endpoint GET /api/productos del backend Go.
 */
export const getProductosApi = async (): Promise<Producto[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/productos`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener productos (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('No se pudo conectar con el servidor Go backend. Verifica que esté en ejecución en http://localhost:3000.', {
        cause: error,
      });
    }
    throw error;
  }
};
