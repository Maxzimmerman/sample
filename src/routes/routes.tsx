import {
    Navigate,
    RouteObject
} from "react-router";

import paths  from "./paths";

import Product from "../modules/products/Product";
import ProductDetail from "../modules/product-details/ProductDetail";

export const routes: RouteObject[] = [
    {
        path: paths.home,
        element: <Navigate to={paths.product} />,
    },
    {
        path: paths.product,
        element: <Product />,
    },
    {
        path: `${paths.product}/:id`,
        element: <ProductDetail />,
    }
]