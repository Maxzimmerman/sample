import { create } from '../../storeRegistry';
import { Product } from './types';

type ProductStore = {
  products: Product[];
  addProduct: (product: Product) => void;
};

const useProductStore = create<ProductStore>((set) => ({
    products: [],
    addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
}))

export default useProductStore;