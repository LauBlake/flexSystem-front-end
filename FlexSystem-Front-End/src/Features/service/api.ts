const API_BASE_URL = 'http://localhost:3000';

export const apiClient = {
    async post (endpoint: string, data: any) {
        try{
            const token = localStorage.getItem('authToken');
            const headers: any = {
                'Content-Type': 'application/json'
            };
            if(token){
                headers.Authorization = `Bearer ${token}`;
            }
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Error en la solicitud');
            }
            return responseData;
        }catch (error) {
            console.error('Error en la solicitud POST:', error);
            throw error;
        }
    },
    
    async get(endpoint: string) {
        try {
            const token = localStorage.getItem('authToken');
            const headers: any = {
                'Content-Type': 'application/json',
            };
            if(token){
                headers.Authorization = `Bearer ${token}`;
            }
            console.log(`Requesting GET to ${API_BASE_URL}/${endpoint}`);
            const response = await fetch(`${API_BASE_URL}/${endpoint}`,{
                method: 'GET',
                headers,
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Error en la solicitud');
            }
            return responseData;
        }catch (error) {
            console.error('Error en la solicitud GET:', error);
            throw error;
        }
    }
}
