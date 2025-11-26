import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { FaCashRegister, FaShoppingBag, FaSyncAlt, FaTruck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function HomePage() {
  // const { featured } = useContext(ProductContext);


  const [featuredProducts, setfeaturedProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://wscubetech.co/ecommerce-api/products.php?limit=8 `)
      .then((result) => {
        setfeaturedProducts(result.data.data)
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }, [])

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="mb-3">Discover Your Next Favorite</h1>
              <p className="lead mb-4">Explore premium products at great prices. Fast shipping. Easy returns.</p>
              <div className="d-flex gap-3"> 
              <Link to={"/products"} className="btn btn-light btn-lg">Shop Now</Link>
                {/* <Link to="/" className="btn btn-outline-light btn-lg">Learn More</Link> */}
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <FaShoppingBag size={200} className="hero-icon-light" />
            </div>
          </div>
        </div>
      </section>

      <div className="container py-0 my-0">
        <div className="text-center mb-5">
          <h2 className="h1 mb-2 fs-1">Featured Products</h2>
          <p className="text-muted lead">Handpicked selection of bestsellers</p>
        </div>



        <div className="row g-4">
          {
            featuredProducts.map((v, id) => {
              return (
                <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <ProductCard product={v} />
                </div>
              )
            })
          }
        </div>

        <div className="text-center mt-5">
          <Link to="/products" className="btn btn-primary btn-lg">View All Products</Link>
        </div>


        <div className="feature-list d-flex gap-2 justify-content-between fs-3 my-5">
          <div className="d-flex align-items-center gap-2">
            <FaSyncAlt className="text-primary" />
            7-day Replacement
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaCashRegister className="text-primary" />
            Cash on Delivery
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaTruck className="text-primary" />
            Free Shipping over $50
          </div>
        </div>
      </div>
    </>
  );
}
