import { useState } from "react";

function Product({ stock, cartST }) {
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(0);

    const decreaseQuantity = function() {
        let tmp = validateQuantity(quantity - 1, 1, stock.remainingQuantity);
        setQuantity(tmp);
    };

    const increaseQuantity = function() {
        let tmp = validateQuantity(quantity + 1, 1, stock.remainingQuantity);
        setQuantity(tmp);
    };

    const handleQuantity = function(e) {
        let tmp = validateQuantity(e.target.value, 1, stock.remainingQuantity);
        setQuantity(tmp);
    };

    const validateQuantity = function(quantity, min, max) {
        if(quantity < min)
            return min;
        else if(quantity > max)
            return max;
        else return quantity;
    };

    const addToCart = function() {
        setAdding(2);

        let obj = { 
            id: stock.product.id, 
            quantity: quantity,
            cartSession: sessionStorage.getItem("cartSession") 
        };

        fetch("http://127.0.0.1:8000/cart/add-product/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        }).then((res) => res.json())
            .then((data) => {
                setAdding(1);
                if(data.cartSession != null)
                    sessionStorage.setItem("cartSession", data.cartSession);
                if(data.cartCount != undefined && data.cartCount != null)
                    cartST.setCart(data.cartCount);
                if(data.error && data.status == 456)
                    sessionStorage.removeItem("cartSession");
                setTimeout(() => setAdding(0), 1000);
            });
    };

    return (
        <div className="col-12 col-sm-12 col-md-12 col-lg-3 product">
            <div className="col card-product">
                <div className="col position-relative">
                    <span className="col-12 px-2 position-absolute top-0 start-0 product-name">{ stock.product.name }</span>
                    <span className="px-2 m-2 position-absolute bottom-0 end-0 stock">
                        {stock.remainingQuantity > 0 ?
                            <span>Avalaible: { stock.remainingQuantity }</span>
                        :
                            <span>Out of Stock</span>
                        }
                    </span>
                    <img src={ "http://127.0.0.1:8000/assets/img/" + stock.product.image } className="img-fluid" alt={ stock.product.name }/>
                </div>
                <div className="col card-info card-info-region">
                    <i className="bi bi-geo-alt-fill card-region"></i> { stock.product.region.name }
                </div>
                <div className="col card-info card-info-price">
                    <i className="bi bi-tag-fill card-price"></i> { stock.product.price } Ar
                </div>
                <div className="col input-group">
                    <button onClick={() => decreaseQuantity()} type="button" className="btn btn-dark button-number-product rounded-0">
                        <i className="bi bi-dash-lg"></i>
                    </button>
                    <input type="number" value={ quantity } onChange={(e) => handleQuantity(e)} min="1" className="form-control input-quantity"/>
                    <button onClick={() => increaseQuantity()} type="button" className="btn btn-dark button-number-product rounded-0">
                        <i className="bi bi-plus-lg"></i>
                    </button>
                </div>
                <div className="col">
                    <button onClick={() => addToCart()} type="button" className="col-12 rounded-0 btn-add-cart">
                        <i className={"bi bi-plus-lg " + (adding == 0 ? "d-inline" : "d-none")}></i> 
                        <i className={"bi bi-check-lg " + (adding == 1 ? "d-inline" : "d-none")}></i>
                        <span className={"spinner-border spinner-border-sm " + (adding == 2 ? "d-inline-block" : "d-none")} role="status" aria-hidden="true"></span> Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;