import { apiInstance, ApiResponse } from "../constants/apiInstance";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";
import mockData from '../data/authMockData.json';

const userApi = apiInstance({
    baseURL: "http://localhost:8080/auth",
});

export const authService = {
    loginUser: async (req: LoginRequest): Promise<ApiResponse<LoginResponse> | null> => {
        const loginResponse: AxiosResponse<ApiResponse<LoginResponse>> = await userApi.post("", req);
        const data = loginResponse.data;

        if (data.code === 200 && data.data?.token) {
            // Save token to localStorage
            localStorage.setItem("token", JSON.stringify(data.data.token));
            return {
                data: {
                    token: data.data.token,
                    accountId: data.data.accountId,
                    accountName: data.data.accountName,
                    accountRole: data.data.accountRole
                },
                code: 200,
                message: "Success"
            };
        }

        return null;

        
    },

    createAccount: async (req: any): Promise<ApiResponse<User> | null> => {
        try {
            const refactorReq: any = {
                accountName: req.accountName,
                email: req.email,
                password: req.password,
                roleId: 2
            }
            const user: AxiosResponse<ApiResponse<User>> = await userApi.post("/account/create", refactorReq);
            return user.data;
        } catch (error) {
            return null;
        }
    },

    checkIsEmailExist: async (email: string): Promise<ApiResponse<boolean> | null> => {
        try {
            const isExist: AxiosResponse<ApiResponse<boolean>> = await userApi.get(`/email-exist/${email}`);
            return isExist.data;
        } catch (error) {
            return null;
        }
    },

    logOut: async (): Promise<ApiResponse<any> | null> => {
        try {
            const isExist: AxiosResponse<ApiResponse<boolean>> = await userApi.get(`/logout`);
            return isExist.data;
        } catch (error) {
            return null;
        }
    }
}

export default authService;

//?model
interface User {
    accountID: number;
    accountName: string;
    accountEmail: string;
    accountRole: number;
    accountPassword: string;
}

//?DTO
interface LoginRequest {
    email: string,
    password: string
}

interface CreateAccountRequest {
    accountName: string;
    accountEmail: string;
    accountRole: number;
    accountPassword: string;
}

interface GetUserWithFilter {
    // page:number
    accountEmail: string,
}

interface LoginResponse {
    token: string;
    accountId: number;
    accountName: string;
    accountRole: number;
}

interface CountRoleResponse {
    total: number;
    guest: number;
    staff: number;
    admin: number;
}