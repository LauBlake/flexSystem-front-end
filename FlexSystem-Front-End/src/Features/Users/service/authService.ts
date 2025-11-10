import {apiClient} from '../../service/api';

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



const decodeToken = (token: string): JWTPayLoad | null => {
  try {
    // 🔍 Verificar que el token tenga el formato correcto
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token JWT debe tener 3 partes separadas por puntos");
    }

    // ✅ Corregido: "playload" -> "payload"
    const payload = parts[1];

    // 🔧 Agregar padding si es necesario para Base64
    let base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    console.error("Token recibido:", token);
    return null;
  }
};

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse>{
        try{
            const response = await apiClient.post('auth/login',{
                username: credentials.username,
                password: credentials.password    
            });
            if (response.access_token) {
              localStorage.setItem("authToken", response.access_token);
            }
            return response
        }catch (error) {
            throw new Error('Error during login: ' + (error as Error).message);
        }
    },
    logout(){
        localStorage.removeItem('authToken');
    },
    getUserInfo(): JWTPayLoad | null{
        const token = localStorage.getItem('authToken');
        if(token){
            return decodeToken(token);
        }
        return null;
    },
    isAuthenticated(): boolean {
        const token = localStorage.getItem('authToken');
        if (!token) return false;
        
        const decoded = decodeToken(token);
        if (!decoded) return false;
        
        // Verificar si el token ha expirado
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            this.logout();
            return false;
        }
        
        return true;
    },
    getToken(): string | null {
        return localStorage.getItem('authToken');
    },
    async register(data: NewUser): Promise<AuthResponse>{
        try{
            const response = await apiClient.post('auth/register-client',{
                username: data.username,
                password: data.password,
                passwordConfirm: data.passwordConfirm,
                client: {
                    name: data.client.name,
                    cuit: data.client.cuit,
                    email: data.client.email,
                    surname: data.client.surname,
                    phone: data.client.phone,
                    adress: data.client.address
                }
            });
            return response;
        }catch(error){
            throw new Error('Error during registration: ' + (error as Error).message);
        }
    }
}
