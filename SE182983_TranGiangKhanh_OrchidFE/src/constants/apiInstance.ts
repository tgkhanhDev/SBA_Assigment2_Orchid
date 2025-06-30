import axios, { InternalAxiosRequestConfig } from "axios";
import Swal from "sweetalert2";

export interface ApiResponse<T> {
    data: T;
    code: number;
    message: string;
}

export const apiInstance = (config) => {
    const api = axios.create(config);

    api.interceptors.request.use((config: any) => {

        const token = localStorage.getItem("token");
        let parsedToken: any = null;
        if(token != null){
            parsedToken = JSON.parse(token);
        }

        return {
            ...config,
            headers: {
                ...config.headers,
                ...(parsedToken && { Authorization: `Bearer ${parsedToken}` }),
                "Content-Type": "application/json",
            },
        };
    });

    api.interceptors.response.use(
        (response: any) => {
            return response;
        },
        (error) => {
            console.log("adasdad: ", error.response);
            
            if (error.response.status === 401) {
                Swal.fire({
                    title: "Your token may expired, please login again",
                    icon: "info",
                    showConfirmButton: true,
                    confirmButtonText: "Yes, I understand!",
                }).then((result) => {
                    window.location.href = "/login";
                    localStorage.removeItem("token");
                });

            } else if (error.response.status === 400 || error.response.status === 403 || error.response.status === 404) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                });
            }

            return Promise.reject(error);
        }
    );

    return api;
};