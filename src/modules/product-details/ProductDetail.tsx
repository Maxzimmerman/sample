import { useEffect } from 'react';
import { generatePath, useParams } from 'react-router-dom';
import paths from '../../routes/paths'

import useProductDetailStore from './store';

export default function ProductDetail() {
    const getProduct = useProductDetailStore((s) => s.getProduct);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getProduct(
            "1"
        );
    }, [getProduct]);

    const productDetailsPath = generatePath(paths.productDetail, {
        id,
    });

    return (
        <div>
            <a href={paths.home}>home</a><span> / </span>
            <a href={paths.product}>products</a><span> / </span>
            <a href={productDetailsPath}>{id}</a>
            <h1>Product Detail </h1>
        </div>
    )
}