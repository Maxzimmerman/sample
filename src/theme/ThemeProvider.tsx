import { ReactNode } from "react";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";

import theme from "./index";

export default function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
                {children}
            </SnackbarProvider>
        </MuiThemeProvider>
    )
}
