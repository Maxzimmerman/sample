import { useEffect } from 'react';
import { generatePath, useParams } from 'react-router-dom';
import paths from '../../routes/paths'

import useProductDetailStore from './store';

export default function ProductDetail() {
    const getProduct = useProductDetailStore((s) => s.getProduct);
    const { productId } = useParams<{ productId: string }>();

    useEffect(() => {
        getProduct(
            "1"
        );
    }, [getProduct]);

    const productDetailsPath = generatePath(paths.productDetail, {
        productId,
    });

    return (
        <div>
            <p>{paths.home}/{paths.product}/{paths.productDetail}</p>
            <h1>Product Detail </h1>
        </div>
    )
}