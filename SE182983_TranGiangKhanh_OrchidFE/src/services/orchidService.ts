import { apiInstance, ApiResponse } from "../constants/apiInstance";
import { AxiosResponse } from "axios";
import mockData from '../data/orchidMockData.json';


const orchidApi = apiInstance({
    baseURL: "http://localhost:8080/orchids",
});


export const orchidService = {
    getOrchidFilter: async (request: any): Promise<ApiResponse<Orchid[]> | null> => {
        try {
            const itemResponse: AxiosResponse<ApiResponse<Orchid[]>> = await orchidApi.get("", {
                params: {
                    search: request.orchidName
                }
            });
            return itemResponse.data
        } catch (error) {
            return null;
        }
    },

    getOrchidById: async (orchidID: number): Promise<ApiResponse<Orchid> | null> => {
        try {
            const itemResponse: AxiosResponse<ApiResponse<Orchid>> = await orchidApi.get(`/${orchidID}`);
            return itemResponse.data;
            // const itemResponse = await mockData.find(item => item.orchidID === orchidID);
            // const res = {
            //     data: itemResponse,
            //     code: 200,
            //     message: 'Success'
            // }

            // return res

        } catch (error) {
            return null;
        }
    },

    countOrchids: async (): Promise<ApiResponse<any>> => {
        try {
            const itemResponse: any = await orchidApi.get("", {
                params: {
                    search: ''
                }
            });
            console.log("statRs:", itemResponse);
            
            const countResponse = {
                total: itemResponse.data.length,
                natural: itemResponse.data.filter(item => item.isNatural).length
            }
            return {
                data: countResponse,
                code: 200,
                message: 'Success'
            }
        } catch (error) {
            return null;
        }
    },

    createOrchid: async (request: AddOrchidRequest): Promise<ApiResponse<Orchid> | null> => {
        try {
            const refactorRequest = {
                isNatural: request.isNatural,
                orchidDescription: request.orchidDescription,
                orchidUrl: request.orchidUrl,
                price: request.price,
                orchidName: request.orchidName,
                category: {
                    categoryId: request.categoryID
                }
            }
            const createItemResponse: AxiosResponse<ApiResponse<Orchid>> = await orchidApi.post(``, refactorRequest);
            return createItemResponse.data;
        } catch (error) {
            return null;
        }
    },

    updateOrchid: async (request: AddOrchidRequest): Promise<ApiResponse<Orchid> | null> => {
        try {
            const refactorRequest = {
                isNatural: request.isNatural,
                orchidDescription: request.orchidDescription,
                orchidUrl: request.orchidUrl,
                price: request.price,
                orchidName: request.orchidName,
                category: {
                    categoryId: request.categoryID
                }
            }
            const updateItemResponse: AxiosResponse<ApiResponse<Orchid>> = await orchidApi.put(`/${request.orchidID}`, refactorRequest);
            return updateItemResponse.data;
        } catch (error) {
            return null;
        }
    },

    deleteOrchid: async (orchidID: number): Promise<ApiResponse<void> | null> => {
        try {
            const deleteResponse: AxiosResponse<ApiResponse<void>> = await orchidApi.delete(`/${orchidID}`);
            return deleteResponse.data;
        } catch (error) {
            return null;
        }
    }
}

export default orchidService


//?model
export interface Orchid {
    orchidID: number
    isNatural: boolean
    orchidDescription: string
    orchidName: string,
    orchidUrl: string
    price: number
    Category: {
        categoryID: number
        categoryName: string
    }
}

interface AddOrchidRequest {
    orchidID: string
    isNatural: boolean
    orchidDescription: string
    orchidName: string,
    orchidUrl: string
    price: number
    categoryID: number
}