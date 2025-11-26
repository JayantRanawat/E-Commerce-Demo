import React, { useContext } from "react";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Context } from "../context/CommonContext";

export default function ProductCard({ product }) {

  const {addToCart} = useContext(Context);



  return (
    <div className="card h-100 hover-card">
      <div className="product-card-image-wrapper">
        <img src={product.image} className="card-img-top" />
      </div>
      <div className="card-body d-flex flex-column">
        <Link to={`/product-details/${product.id}`}>
          <h5 className="card-title fw-bold">{product.name}</h5>
        </Link> 
        <div className="fw-bold fs-6">
          <FiDollarSign />
          {product.price}
        </div>
        <p className="text-muted mb-2 small">
          {product.brand_name} • {product.category_name}
        </p>
        <div className="card_description">{product.description}</div>
        <div className="mb-3">
          <span className="rating-stars">
            <FaStar /> {product.rating}
          </span>
        </div>
        <div className="mt-auto d-flex gap-2">
          <button
            className="btn btn-primary btn-sm flex-grow-1 add-to-cart-btn"
            onClick={()=> addToCart(product)}
          >
            <FaCartPlus size={14} />
            Add to cart
          </button>
          {/* <a className="btn btn-outline-secondary btn-sm" href="#">View</a> */}
        </div>
      </div>
    </div>
  );
}
