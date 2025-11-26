import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingBag } from 'react-icons/fa';
import CommonContext, { Context } from '../context/CommonContext';

export default function CartPage() {

  const { cartItems, updateQuantity ,removeFromCart, clearCart } = useContext(Context);

  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(()=>{
    var sum = 0;

    cartItems.forEach((v)=>{
      sum += v.price *v.quantity;

    })

    setTotalAmount(sum);
  },[cartItems])


  return (
    <div className="container py-5">
      <h2 className="mb-4"><FaShoppingBag className="me-2" />Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center empty_cart">
          <h5>Your cart is empty</h5>
          <p className="mb-3 text-muted">Start shopping to add items to your cart</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="bg-white rounded p-4 cart-item-card">
              <h5 className="mb-3">Items in Cart <span className='fs-5'>({cartItems.length} Items)</span></h5>
              <ul className="list-group list-group-flush">
                {cartItems.map(item => (
                  <li key={item.id} className="list-group-item d-flex align-items-center py-3">
                    <img src={item.image} alt="" className="me-3 rounded cart-item-image" />
                    <div className="flex-grow-1">
                      <div className="fw-bold">{item.name}</div>
                      <small className="text-muted">{item.brand}</small>
                      <div className="mt-1">
                        <span className="price-badge">${item.price}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center border rounded p-1 cart-qty-border">
                        <button className="btn btn-sm  p-1" onClick={() => updateQuantity(item.id , 'minus')}>-</button>
                        <input type="number" readOnly value={item.quantity} className=" form-control-sm text-center cart-qty-input" />
                        <button className="btn btn-sm  p-1" onClick={() => updateQuantity(item.id , 'add')}>+</button>
                      </div>
                      <div className="text-end cart-total-text">
                        <div className="fw-bold">${(item.quantity * item.price).toFixed(2)}</div>
                      </div>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)} title="Remove item">
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <button className="btn btn-outline-secondary" onClick={clearCart}> Clear cart</button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="bg-white rounded p-4 cart-summary-card">
              <h5 className="mb-3">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>${(totalAmount).toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <strong className="text-success">Free</strong>
              </div>
              {/* <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <strong>${(total * 0.08).toFixed(2)}</strong>
              </div> */}
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <strong className="h5 mb-0">${(totalAmount).toFixed(2)}</strong>
              </div>
              <button className="btn btn-primary w-100 mb-2 checkout-btn-text">Proceed to Checkout</button>
              <Link to="/products" className="btn btn-outline-secondary w-100">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
