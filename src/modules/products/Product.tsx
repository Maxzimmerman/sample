import { Box, Typography, useTheme } from "@mui/material";

export default function Product() {
    const theme = useTheme();

    return (
       <Box sx={{ p:2, bgcolor: 'background.paper' }}>
            <Typography variant="h5" sx={{ color: 'primary.main', mb: 2 }}>
                Product List
            </Typography>
            <Typography variant="h5" sx={{ color: theme.colors.secondary, mb: 2 }}>
                This is the product list page.
            </Typography>
       </Box>
    )
}