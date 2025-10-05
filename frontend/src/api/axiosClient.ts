import axios from "axios"

const axiosClient = axios.create({
    baseURL: "http://localhost:4000",
   withCredentials: true, 
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error.response?.data || error.message);
        return Promise.reject(error)
    }
);

export default axiosClient;