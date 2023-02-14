import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullArticle from './modules/article/FullArticle';
import Home from './modules/article/Home';
import NewArticle from './modules/article/NewArticle';
import Login from './modules/auth/Login';
import Register from './modules/auth/Register';
import ByCategory from './modules/category/ByCategory';
import NewCategory from './modules/category/NewCategory';

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/article/:id', element: <FullArticle /> },
    { path: '/article/new', element: <NewArticle /> },
    { path: '/article/new/:id', element: <NewArticle /> },
    { path: '/category/new', element: <NewCategory /> },
    { path: '/category/:title', element: <ByCategory /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
        />
        <RouterProvider router={router} />
    </React.StrictMode>
);
