import React, { useState } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify';

const Context = createContext();

export default function CommonContext({ children }) {


    const [isLogin, setIsLogin] = useState(1);


    var getCartData = localStorage.getItem('cartItems');
    var getCartData = JSON.parse(getCartData);


    const [cartItems, setCartItems] = useState(getCartData  ?? [] );


    // Function for add product into cart
    const addToCart = (product) => {

        var checkCart = cartItems.filter((v) => {
            if (v.id == product.id) {
                return v;
            }
        })

        if (checkCart.length == 0) {
            const cart = {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
                brand: product.brand,
                quantity: 1
            }
            const finalCartdata = [cart, ...cartItems];

            var cartStorage = JSON.stringify(finalCartdata);
            localStorage.setItem('cartItems', cartStorage);

            setCartItems(finalCartdata);
            toast.success('Add to cart');
        } else {
            const cartData = cartItems.map((v) => {
                if (v.id == product.id) {
                    v.quantity++;
                    return v;
                } else {
                    return v;
                }
            })
            const finalCartdata = [...cartData];
            var cartStorage = JSON.stringify(finalCartdata);
            localStorage.setItem('cartItems', cartStorage);
            setCartItems(finalCartdata);
            toast.success('Quantity Increased')

        }
    }

    // Function for updating quantity into cart at cart page
    const updateQuantity = (id, type) => {
        if (type == 'add') {
            const cartData = cartItems.map((v) => {
                if (v.id == id) {
                    if (v.quantity < 5) {
                        v.quantity++;
                        toast.success('Quantity Increased')
                        return v;
                    } else {
                        toast.error('You can add only 5 qty max!');
                        return v;
                    }
                } else {
                    return v;
                }
            })
            const finalCartdata = [...cartData];
            var cartStorage = JSON.stringify(finalCartdata);
            localStorage.setItem('cartItems', cartStorage);
            setCartItems(finalCartdata);

        } else {
            const cartData = cartItems.map((v) => {
                if (v.id == id) {
                    if (v.quantity > 1) {
                        v.quantity--;
                        toast.success('Quantity Decreased')
                        return v;
                    } else {
                        toast.error('Minimum 1 quantity is required')
                        return v;
                    }

                } else {
                    return v;
                }
            })
            const finalCartdata = [...cartData];
            var cartStorage = JSON.stringify(finalCartdata);
            localStorage.setItem('cartItems', cartStorage);
            setCartItems(finalCartdata);

        }
    }


    // Removing Product from cart at cart page
    const removeFromCart = (id) => {
        if (confirm('Are you sure you want to remove it?')) {


            const cartData = cartItems.filter((v) => {
                if (v.id != id) {
                    return v
                }
            })


            const finalData = [...cartData];
            setCartItems(finalData);
            localStorage.setItem('cartItems', JSON.stringify(finalData));
            toast.success('Removed from cart');
        }
    }

    // Clear all products use clear cart button
    const clearCart = () => {
        if (confirm('Are you sure you want to remove all items?')) {

            setCartItems([]);
            localStorage.removeItem('cartItems');
            toast.success('Clear Cart');
        }
    }

    const data = { isLogin, setIsLogin, cartItems, setCartItems, addToCart, updateQuantity, removeFromCart, clearCart }

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export { Context }