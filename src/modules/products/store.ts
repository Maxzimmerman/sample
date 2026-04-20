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

type ProductStore = RowsSlice<Product> &
    GridSlice<Product> & {
        loading: boolean;
        getProducts: () => Promise<void>;
        saveProducts: () => Promise<void>;
    };

const useProductStore = create<ProductStore>()((set, get, ...rest) => ({
    ...createRowsSlice<Product>([])(set, get, ...rest),
    ...createGridSlice<Product>({ allColumns: columns })(set, get, ...rest),

    loading: false,

    getProducts: async () => {
        set({ loading: true });
        const products = await productsApi.getProducts();
        get().reset(products);
        set({ loading: false });
    },

    saveProducts: async () => {
        const { changeSet, rows, reset } = get();
        console.log('Saving changes:', changeSet);

        const current = rows.map(({ _isNew, ...rest }) => rest as Product);
        reset(current);
    },
}));

export default useProductStore;
