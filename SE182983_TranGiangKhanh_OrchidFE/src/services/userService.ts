import { apiInstance, ApiResponse } from "../constants/apiInstance";
import { AxiosResponse } from "axios";
import mockData from '../data/authMockData.json';

const userApi = apiInstance({
    baseURL: "http://localhost:8080/account",
});

const userService = {

    getUserWithFilter: async (req: GetUserWithFilter): Promise<ApiResponse<User[]> | null> => {
        try {
            // const users: AxiosResponse<ApiResponse<User[]>> = await userApi.get(`/list?email=${req.accountEmail}`);
            // return users.data;
            const users: User[] = mockData;
            return {
                data: users.filter(item => item.accountEmail.toLowerCase().includes(req.accountEmail.toLowerCase())),
                code: 200,
                message: 'Success'
            }

        } catch (error) {
            return null;
        }
    },

    countRole: async (): Promise<ApiResponse<CountRoleResponse>> => {
        try {
            // const countRole: AxiosResponse<ApiResponse<CountRoleResponse>> = await userApi.get("/role-stats");
            // return countRole.data;
            const adminCount = mockData.filter(user => user.accountRole === 1).length;
            const guestCount = mockData.filter(user => user.accountRole === 2).length;
            return {
                data: {
                    total: mockData?.length || 0,
                    admin: adminCount || 0,
                    guest: guestCount || 0
                },
                code: 200,
                message: "Success (mock data)"
            };

        } catch (error) {
            return null;
        }
    },

    deleteAccount: async (accountID: number): Promise<ApiResponse<User> | null> => {
        try {
            const user = await userApi.delete(`/${accountID}`);
            return user.data;
        } catch (error) {
            return null;
        }
    },

    updateAccount: async (req: User): Promise<ApiResponse<User> | null> => {
        try {
            const user: AxiosResponse<ApiResponse<User>> = await userApi.put(`/${req.accountID}`, req);
            return user.data;
        } catch (error) {
            return null;
        }
    },

    findUserById: async (id: number): Promise<ApiResponse<User> | null> => {
        try {
            const user: AxiosResponse<ApiResponse<User>> = await userApi.get(`/${id}`);
            return user.data;
        } catch (error) {
            return null;
        }
    }

}

export default userService;

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
    accountRole: number;
}

interface CountRoleResponse {
    total: number;
    guest: number;
    admin: number;
}