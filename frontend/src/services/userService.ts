import api from './api';
import { jwtDecode } from 'jwt-decode'


export const getUserIdFromToken = (): string => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            return String(userId);
        } catch (err) {
            console.log('Error decoding token', err);
            return '';
        }
    }
    return '';
}

export const getAllUsers = async (): Promise<Event[]> => {
    const response = await api.get('/api/users')
    return response.data
}

export const getUserProfile = async (token: string) => {
    const response = await api.get(`/api/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
}


