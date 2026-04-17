import React from 'react';
import logo from './logo.svg';
import './App.css';

import {routes} from "./routes/routes";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router";

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
