import { apiInstance, ApiResponse } from "../constants/apiInstance";
import { AxiosResponse } from "axios";
import mockData from '../data/orderMockData.json';

const userApi = apiInstance({
    baseURL: "http://localhost:8080/orders",
});

export const orderService = {
    getAllOrderByAccountID: async (id: number): Promise<ApiResponse<Order[]> | null> => {
        const orders: Order[] = mockData;
        return {
            data: orders.filter(item => item.accountID === id),
            code: 200,
            message: 'Success'
        }
    },
    createOrder: async (orderCreateRequest: OrderCreateRequest): Promise<ApiResponse<Order> | null> => {
        const orderResponse: AxiosResponse<ApiResponse<Order>> = await userApi.post("", orderCreateRequest);
        return orderResponse.data;
    }
}

export default orderService;

export interface Order {
    id: number;
    accountID: number;
    orderDate: string;
    orderStatus: string;
    totalAmount: number;
    OrderDetail: OrderDetail[];
}

export interface OrderDetail {
    id: number;
    orchidID: number;
    orchidName?: string;
    orchidUrl?: string;
    price: number;
    quantity: number;
    orderID: number;
}

export interface OrderCreateRequest{
    account: {
        id: string ;
    };
    orderDate: string; // dạng yyyy-MM-dd
    orderStatus: "Paid" | "Pending" | "Cancelled"; 
    totalAmount: number;
    orchid: {
        orchidId: number | string;
    };
    price: number;
    quantity: number;      
}