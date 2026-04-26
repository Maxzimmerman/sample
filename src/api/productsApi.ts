import { Product } from '../modules/products/types';

const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: 'Apple', category: 'Fruit', price: 1.29, createdAt: '2025-11-01' },
    { id: 2, name: 'Banana', category: 'Fruit', price: 0.59, createdAt: '2025-11-05' },
    { id: 3, name: 'Cherry', category: 'Fruit', price: 4.99, createdAt: '2025-12-10' },
    { id: 4, name: 'Milk', category: 'Dairy', price: 3.49, createdAt: '2026-01-02' },
    { id: 5, name: 'Cheddar Cheese', category: 'Dairy', price: 5.99, createdAt: '2026-01-15' },
    { id: 6, name: 'Sourdough Bread', category: 'Bakery', price: 4.50, createdAt: '2026-02-20' },
    { id: 7, name: 'Orange Juice', category: 'Beverages', price: 3.99, createdAt: '2026-03-01' },
    { id: 8, name: 'Almonds', category: 'Snacks', price: 7.49, createdAt: '2026-03-10' },
];

const productsApi = {
    getProducts: async (): Promise<Product[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return MOCK_PRODUCTS;
    },
    getProductById: async (id: string): Promise<Product> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const product = MOCK_PRODUCTS.find((p) => p.id === parseInt(id));
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    },
};

export default productsApi;
