import api from "./api";

export const login = async (email: string, password:string) => {
    const response = await api.post("/api/users/login", { email, password });
    return response.data;
};

export const register = async (email: string, password: string, name: string) => {
    const response = await api.post("/api/users/register", { email, password, name });
    return response.data;
};

export const checkToken = async (token: string): Promise<boolean> => {
    const response = await api.post("/api/auth/check", {} ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

