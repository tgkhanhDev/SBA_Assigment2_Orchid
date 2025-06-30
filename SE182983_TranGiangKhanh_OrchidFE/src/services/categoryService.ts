import { apiInstance, ApiResponse } from "../constants/apiInstance";
import Swal from "sweetalert2";
import { AxiosResponse } from "axios";
import mockData from '../data/categoryMockData.json';


const categoryApi = apiInstance({
    baseURL: "http://localhost:8080/category",
});


export const categoryService = {
    getCategoryWithFilter: async ({ categoryName }): Promise<ApiResponse<Category[]> | null> => {
        try {
            categoryName = categoryName?.trim() || "";
            const lsCategories: AxiosResponse<ApiResponse<Category[]>, any> = await categoryApi.get(``,{
                params: {
                    search: categoryName
                }
            });
            return lsCategories.data;
        } catch (error) {
            return null;
        }
    },
    countCategory: async (): Promise<ApiResponse<any>> => {
        try {
            const lsCategories: any = await categoryApi.get(``,{
                params: {
                    search: ""
                }
            });            

            const res = {
                total: lsCategories.data.length
            }

            return {
                data: res,
                code: 200,
                message: 'Success'
            }
        } catch (error) {
            return null;
        }
    },
    createCategory: async ({ categoryName }): Promise<ApiResponse<Category> | null> => {
        try {
            const createItemResponse: AxiosResponse<ApiResponse<Category>> = await categoryApi.post(``, { categoryName });
            return createItemResponse.data;
        } catch (error) {
            return null;
        }
    },
    updateCategory: async ({ categoryID, categoryName }): Promise<ApiResponse<Category> | null> => {
        try {
            const updateItemResponse: AxiosResponse<ApiResponse<Category>> = await categoryApi.put(`/${categoryID}`, { categoryID, categoryName });
            return updateItemResponse.data;
        } catch (error) {
            return null;
        }
    },
    deleteCategory: async (categoryID: number): Promise<ApiResponse<void> | null> => {
        try {
            const deleteResponse: AxiosResponse<ApiResponse<void>> = await categoryApi.delete(`/${categoryID}`);
            return deleteResponse.data;
        } catch (error) {
            return null;
        }
    },
}

export default categoryService




//?model
interface Category {
    categoryID: number
    categoryName: string
}
