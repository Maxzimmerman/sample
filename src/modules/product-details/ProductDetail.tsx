import { useEffect } from 'react';

import useProductDetailStore from './store';

export default function ProductDetail() {
    const getProduct = useProductDetailStore((s) => s.getProduct);

    useEffect(() => {
        getProduct(
            "1"
        );
    }, [getProduct]);

    return (
        <div>
            <h1>Product Detail </h1>
        </div>
    )
}