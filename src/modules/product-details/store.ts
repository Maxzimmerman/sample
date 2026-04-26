import { create } from '../../storeRegistry';
import { Product } from './types';
import productsApi from '../../api/productsApi';
import createRowsSlice, {
    RowsSlice,
} from '../../common/components/editable-data-grid/createRowsSlice';
import createGridSlice, {
    GridSlice,
} from '../../common/components/editable-data-grid/createGridSlice';
import columns from './columns';

type ProductDetailStore = RowsSlice<Product> & 
    GridSlice<Product> & {
        loading: boolean;
        getProduct: (id: string) => Promise<void>;
    };

const useProductDetailStore = create<ProductDetailStore>()((set, get, ...rest) => ({
    ...createRowsSlice<Product>([])(set, get, ...rest),
    ...createGridSlice<Product>({ allColumns: columns })(set, get, ...rest),

    loading: false,

    getProduct: async (id: string) => {
        set({ loading: true });
        const product = await productsApi.getProductById(id);
        get().reset([product]);
        set({ loading: false });
    },
}));