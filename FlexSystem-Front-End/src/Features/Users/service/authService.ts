import { apiClient } from '../../service/api';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface NewUser{

    username: string;
    password: string;
    passwordConfirm: string;
    client: NewClient;

}

export interface NewClient{
    name: string;
    cuit: string;
    email: string;
    surname: string;
    phone: string;
    address: string;
}

export interface JWTPayLoad{
    mail: string;
    id: string;
    name: string;
    role: string;
    exp?: number;
    iat?: number;
}

export interface AuthResponse {
    access_token: string;
}



const STORAGE_KEY = 'authToken'; // 👈 1 sola clave, centralizada

const decodeToken = (token: string): JWTPayLoad | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Token JWT inválido');

    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('auth/login', {
        username: credentials.username,
        password: credentials.password,
      });

      // ⬇️ si es Axios, el payload está en data
      const token = (response.data?.access_token ?? response.access_token) as string | undefined;

      if (token) {
        localStorage.setItem(STORAGE_KEY, token); // 👈 misma key en todo el app
        return { access_token: token };
      }

      throw new Error('No access_token in response');
    } catch (error) {
      throw new Error('Error during login: ' + (error as Error).message);
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },

  getUserInfo(): JWTPayLoad | null {
    const token = localStorage.getItem(STORAGE_KEY);
    return token ? decodeToken(token) : null;
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return false;
    const decoded = decodeToken(token);
    if (!decoded) return false;
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      this.logout();
      return false;
    }
    return true;
  },

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  },

  async register(data: NewUser): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('auth/register-client', {
        username: data.username,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        client: {
          name: data.client.name,
          cuit: data.client.cuit,
          email: data.client.email,
          surname: data.client.surname,
          phone: data.client.phone,
          adress: data.client.address,
        },
      });
      return response.data ?? response;
    } catch (error) {
      throw new Error('Error during registration: ' + (error as Error).message);
    }
  },
};