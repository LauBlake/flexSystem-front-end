import {apiClient} from '../../service/api';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse>{
        try{
            const response = await apiClient.post('auth/login',{
                email: credentials.email,
                password: credentials.password    
            });
            if(response.token){
                localStorage.setItem('authToken', response.token);
            }
            return response
        }catch (error) {
            throw new Error('Error during login: ' + (error as Error).message);
        }
    },
    logout(){
        localStorage.removeItem('authToken');
    },
    isAuthenticated(): boolean {
        return !!localStorage.getItem('authToken');
    },
    getToken(): string | null {
        return localStorage.getItem('authToken');
    }
}