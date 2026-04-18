import { Product } from '../modules/products/types';

const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
];

const prodcutsApi = {
    getProducts: async (): Promise<Product[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return MOCK_PRODUCTS;
    },
};

export default prodcutsApi;