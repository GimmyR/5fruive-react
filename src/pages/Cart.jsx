import { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import * as bootstrap from 'bootstrap';

import '../styles/Cart.css';

function Cart({ cartST }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, setCart] = useState([]);

    const fetchCart = function() {
        const body = { cartSession: sessionStorage.getItem("cartSession") };

        fetch("http://127.0.0.1:8000/cart/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then((res) => res.json())
            .then((data) => {
                if(!data.error) {
                    setCart(data.cart);
                    calculateTotalPrice(data.cart);
                    cartST.setCart(data.cart.length);
                }
            });
    };

    const calculateTotalPrice = function(cart_) {
        var result = 0;
        cart_.forEach((item) => 
            result += (item.quantity * item.stock.product.price
        )); setTotalPrice(result);
    };

    useEffect(() => fetchCart(), []);

    const clearCart = function() {
        const body = { cartSession: sessionStorage.getItem("cartSession") };

        fetch("http://127.0.0.1:8000/cart/clear/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then((res) => res.json())
            .then((data) => {
                if(!data.error) {
                    sessionStorage.removeItem("cartSession");
                    setCart([]);
                    setTotalPrice(0);
                    cartST.setCart(0);
                }
            });
    };

    const validateCart = function() {
        const body = { accSession: sessionStorage.getItem("accSession") };

        fetch("http://127.0.0.1:8000/account/auth/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then((res) => res.json())
            .then((data) => {
                if(!data.error) {
                    if(data.account != null)
                        document.location.href = "/Validate";
                } else {
                    const modalSignIn = new bootstrap.Modal("#modal-sign-in", { keyboard: false });
                    modalSignIn.show();
                }
            });
    };

    return (
        <div className="container-fluid cart-products">
            {cart.map((item) => 
                <CartProduct key={item.stock.product.id} item={item} fetchCart={fetchCart}/>
            )}

            <div className="row py-2">
                <div className="col-12 col-lg-10 offset-lg-1 cart-total-price">
                    <div className="row">
                        <div className="col-md-10 border border-dark text-center">
                            <span className="fs-1 fw-bold">Total Price</span>
                        </div>
                        <div className="col-md-2 border border-dark d-flex justify-content-center">
                            <span className="fs-2 fw-bold align-self-center">
                                <span id="total-price">{ totalPrice }</span> Ar
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {(totalPrice > 0) ? 
                <div className="row py-2">
                    <div className="col-12 col-lg-10 offset-lg-1">
                        <div className="row">
                            <button onClick={() => clearCart()} className="btn btn-danger btn-cart col-12 col-lg-2 mb-3" type="button">Clear Cart</button>
                            <button className="btn btn-info btn-cart col-12 col-lg-2 offset-lg-3 mb-3" type="button">Save Cart</button>
                            <button onClick={() => validateCart()} className="btn btn-primary btn-cart col-12 col-lg-2 offset-lg-3 mb-3" type="button">Validate Cart</button>
                        </div>
                    </div>
                </div>
            : null }
        </div>
    );
}

export default Cart;