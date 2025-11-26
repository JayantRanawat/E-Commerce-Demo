import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Context } from '../../../context/CommonContext';

export default function Header() {

  const { islogin, cartItems} = useContext(Context);

  

  return (
    <header className="site-header bg-white shadow-sm">
      <nav className="container navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand fw-bold" to="/">Mini E-Com</Link>
        
        <Link to="/cart" className="btn btn-outline-primary position-relative ms-auto me-2 order-lg-last cart-btn-fixed">
          Cart
          {
            cartItems.length > 0
            ?
            <span className='p-1 bg-success-subtle rounded-4'>{cartItems.length}</span>
            :
            ''
          }
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
          </ul>
          <div className="d-flex align-items-center flex-wrap gap-2">
            {/* <ul className="navbar-nav me-auto mx-3 mb-lg-0">
              {
                islogin == 1
                  ?
                  <li className="nav-item"><Link className="nav-link border rounded" >Logout</Link></li>
                  :
                  <li className="nav-item"><Link className="nav-link border rounded" >Login/Register</Link></li>
              }

            </ul> */}
          </div>
        </div>
      </nav>
    </header>
  )
}
