import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCartPlus, FaCashRegister, FaStar, FaSyncAlt, FaTruck } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function ProductDetail() {

    const params = useParams();
    const [productDeatils, setProductDetails] = useState('');
    const [singleImage, setSingleImage] = useState('');
    const [multipleImages, setMultipleImages] = useState([]);

    useEffect(() => {
        axios.get(`https://wscubetech.co/ecommerce-api/productdetails.php?id=${params.id}`)
            .then((result) => {
                setProductDetails(result.data.product)
                setSingleImage(result.data.product.multiple_images[0])
                setMultipleImages(result.data.product.multiple_images)
            })
            .catch(() => {
                toast.error('Something went wrong!')
            })
    }, [params])

  

        return (
            <div className="container py-5">
                <div className="mb-4">
                    <Link to="/products" className="btn btn-link">← Back to products</Link>
                </div>

                <div className="row g-4 product-detail">
                    <div className="col-md-6">
                        <div className="product-main">
                            <div className="product-main-img">
                                <img src={singleImage} className="img-fluid rounded" />
                            </div>
                            {multipleImages.length > 1 && (
                                <div className="product-thumbs d-flex gap-2 mt-3">
                                    {multipleImages.map((src, i) => (
                                        <button key={i} className={`thumb-btn ${src === singleImage ? 'thumb-active' : ''}`} onClick={() => setSingleImage(src)}>
                                            <img src={src} alt={`thumb-${i}`} className="rounded" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h2 className="fw-bold">{productDeatils.name}</h2>
                        <div className="d-flex align-items-center gap-3 my-2">
                            <div className="rating-stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar key={i} className={i < Math.round(productDeatils.rating || 0) ? 'text-warning' : 'text-muted'} />
                                ))}
                            </div>
                            <div className="small text-muted">{productDeatils.rating} / 5</div>
                            <div className="badge bg-success ms-2">{productDeatils.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                        </div>

                        <div className="my-3">
                            {productDeatils.discount_percentage > 0 ? (
                                <div className="d-flex align-items-baseline gap-3">
                                    <div className="h4 mb-0">${productDeatils.price}</div>
                                    <div className="badge bg-danger">{productDeatils.discount_percentage}% OFF</div>
                                </div>
                            ) : (
                                <div className="h4">${productDeatils.price}</div>
                            )}
                        </div>

                        <p className="text-muted">{productDeatils.description}</p>

                        <div className="d-flex align-items-center gap-3 my-3">
                            {/* <div className="d-flex align-items-center border rounded p-1 cart-qty-border">
                                <button className="btn btn-sm btn-link p-1" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                                <input type="number" value={qty} readOnly className="form-control form-control-sm text-center cart-qty-input" />
                                <button className="btn btn-sm btn-link p-1" onClick={() => setQty(q => q + 1)}>+</button>
                            </div> */}

                            <button className="btn btn-primary btn-lg d-flex align-items-center gap-2">
                                <FaCartPlus /> Add to Cart
                            </button>
                        </div>

                        <div className="mt-4 feature-list d-flex flex-column gap-2">
                            <div className="d-flex align-items-center gap-2"><FaSyncAlt className="text-primary"/> <small className="text-muted">7-day Replacement</small></div>
                            <div className="d-flex align-items-center gap-2"><FaCashRegister className="text-primary"/> <small className="text-muted">Cash on Delivery</small></div>
                            <div className="d-flex align-items-center gap-2"><FaTruck className="text-primary"/> <small className="text-muted">Free Shipping over $50</small></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
