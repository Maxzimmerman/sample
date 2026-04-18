import { create } from '../../storeRegistry';
import { Product } from './types';
import productsApi from '../../api/productsApi';

type ProductStore = {
  products: Product[];
  addProduct: (product: Product) => void;
  getProducts: () => Promise<void>;
};

const useProductStore = create<ProductStore>((set) => ({
    products: [],
    addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
    getProducts: async () => {
        const products = await productsApi.getProducts();
        set({ products });
    },
}))

export default useProductStore;