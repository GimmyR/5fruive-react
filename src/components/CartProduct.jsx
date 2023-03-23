import { useState } from "react";

function CartProduct({ item, fetchCart }) {
    const [quantity, setQuantity] = useState(parseInt(item.quantity));

    const decreaseQuantity = function() {
        let obj = { 
            id: item.stock.product.id, 
            quantity: 1,
            cartSession: sessionStorage.getItem("cartSession") 
        };

        fetch("http://127.0.0.1:8000/cart/remove-product/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        }).then((res) => res.json())
            .then((data) => {
                var tmp = quantity - 1;
                if(tmp < 0)
                    tmp = 0;
                setQuantity(tmp);
                fetchCart();
            });
    };

    const increaseQuantity = function() {
        let obj = { 
            id: item.stock.product.id, 
            quantity: 1,
            cartSession: sessionStorage.getItem("cartSession") 
        };

        fetch("http://127.0.0.1:8000/cart/add-product/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        }).then((res) => res.json())
            .then((data) => {
                var tmp = quantity + 1;
                if(tmp > item.stock.remainingQuantity)
                    tmp = item.stock.remainingQuantity;
                setQuantity(tmp);
                fetchCart();
            });
    };

    return (
        <div className="row py-2">
            <div className="col-12 col-lg-10 offset-lg-1 cart-product">
                <div className="row">
                    <div className="col-md-3 cart-image px-0 d-flex border border-dark position-relative">
                        <span className="px-2 m-2 position-absolute bottom-0 end-0 stock">
                            {(item.stock.remainingQuantity > 0) ?
                                <span>Available: { item.stock.remainingQuantity }</span>
                            :
                                <span>Out of Stock</span>
                            }
                        </span>
                        <img src={ "http://127.0.0.1:8000/assets/img/" + item.stock.product.image } className="img-fluid align-self-center"/>
                    </div>
                    <div className="col-md-4 py-2 d-flex border border-dark">
                        <div className="align-self-center">
                            <div>
                                <h1 className="fw-bold text-light cart-product-name">{ item.stock.product.name }</h1>
                            </div>
                            <div>
                                <h3 className="text-custom cart-product-category">
                                    <i className="bi bi-arrow-return-right text-light"></i> { item.stock.product.subcategory.category.name } / { item.stock.product.subcategory.name }
                                </h3>
                            </div>
                            <div>
                                <h3 className="text-custom cart-product-region">
                                    <i className="bi bi-geo-alt-fill text-info"></i> { item.stock.product.region.name }
                                </h3>
                            </div>
                            <div>
                                <h3 className="text-custom cart-product-price">
                                    <i className="bi bi-tag-fill text-warning"></i> 
                                    <span id="product-price-{{ item.stock.product.id }}">{ item.stock.product.price }</span> Ar
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex border border-dark">
                        <div className="input-group align-self-center">
                            <button onClick={() => decreaseQuantity()} type="button" className="btn btn-dark btn-number-product rounded-0">
                                <i className="bi bi-dash-lg"></i>
                            </button>
                            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" className="form-control input-quantity"/>
                            <button onClick={() => increaseQuantity()} type="button" className="btn btn-dark btn-number-product rounded-0">
                                <i className="bi bi-plus-lg"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-2 cart-product-total-price d-flex justify-content-center border border-dark position-relative">
                        <button className="btn btn-danger rounded-0 position-absolute top-0 end-0" type="button">
                            <i className="bi bi-x-lg"></i>
                        </button>
                        <span className="fs-2 fw-bold align-self-center">
                            <span>{ quantity * item.stock.product.price }</span> Ar
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;