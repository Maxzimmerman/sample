import { create } from '../../storeRegistry';
import { Product } from './types';
import productsApi from '../../api/productsApi';

type ProductStore = {
  products: Product[];
  loading: boolean;
  getProducts: () => Promise<void>;
};

const useProductStore = create<ProductStore>((set) => ({
    products: [],
    loading: false,
    getProducts: async () => {
        set({ loading: true });
        const products = await productsApi.getProducts();
        set({ products, loading: false });
    },
}));

export default useProductStore;
