import { Box, Button, Typography, useTheme } from "@mui/material";

import useProductsStore from "./store";

export default function Product() {
    const theme = useTheme();
    const { products, addProduct, getProducts } = useProductsStore();

    return (
       <Box sx={{ p:2, bgcolor: 'background.paper' }}>
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 2 }}>
                Product List {products.length}
            </Typography>

            {products.map((p) => (
                <Typography key={p.id}>
                    #{p.id} — {p.name}
                </Typography>
            ))}

            <Button variant="contained" 
                    color="primary" 
                    onClick={() => addProduct({ id: products.length + 1, name: `Product ${products.length + 1}` })}>
                Add Product
            </Button>

            <Button variant="outlined" 
                    color="secondary" 
                    sx={{ ml: 2 }}
                    onClick={() => getProducts()}>
                Log Products
            </Button>

            <Typography variant="h5" sx={{ color: theme.colors.secondary, mb: 2 }}>
                This is the product list page.
            </Typography>
       </Box>
    )
}