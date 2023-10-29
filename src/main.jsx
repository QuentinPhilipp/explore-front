import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StravaAuth from './StravaAuth';
import Activities from './Activities';

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';


const router = new createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/strava_auth',
        element: <StravaAuth />
    },
    {
        path: '/activities',
        element: <Activities />
    }
])


ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );