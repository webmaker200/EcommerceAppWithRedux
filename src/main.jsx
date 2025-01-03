import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Store from './store/store.js'
import { Provider } from 'react-redux'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cart from './ecommerce/Cart.jsx'
import Home from './components/Home.jsx'
import Checkout from './ecommerce/Checkout.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
 
    <Provider store={Store}>
    <RouterProvider router={router} />
    </Provider>
  
)
