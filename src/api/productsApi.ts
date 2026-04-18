import apiClient from './coreApiClient';
import { API_ENDPOINTS } from './endpoints';
import { Product } from '../modules/products/types';


const prodcutsApi = {
    getProducts: async (): Promise<Product[]> => {
        const response = await apiClient.get<{ data: Product[] }>(API_ENDPOINTS.PRODUCTS);
        return response.data.data;
    }
}

export default prodcutsApi;