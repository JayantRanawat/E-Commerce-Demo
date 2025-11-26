import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './assets/Component/Common/Header'
import Footer from './assets/Component/Common/Footer'
import HomePage from './pages/HomePage'
import ProductListing from './pages/ProductListing'
import CartPage from './pages/CartPage'
import { ToastContainer } from 'react-toastify';
import './assets/Css/style.css'
import ProductDetail from './assets/Component/ProductDetail';
import CommonContext from './context/CommonContext';

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
        <ToastContainer />
          <CommonContext>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product-details/:id" element={<ProductDetail />} />
            </Routes>
            <Footer />
          </CommonContext>
    </BrowserRouter>
  </>
)
