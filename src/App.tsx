import React from 'react';
import logo from './logo.svg';
import './App.css';

import {routes} from "./routes/routes";
import ThemeProvider from "./theme/ThemeProvider";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router";

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
