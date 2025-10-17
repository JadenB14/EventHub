import api from "./api";

export const login = async (email: string, password:string) => {
    const response = await api.post("/api/users/login", { email, password });
    return response.data;
};

export const register = async (email: string, password: string, name: string) => {
    const response = await api.post("/api/users/register", { email, password, name });
    return response.data;
};

