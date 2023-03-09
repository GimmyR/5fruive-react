function Product({ stock }) {
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
                    <button type="button" className="btn btn-number-product rounded-0">
                        <i className="bi bi-dash-lg"></i>
                    </button>
                    <input type="number" defaultValue="1" min="1" className="form-control input-quantity" id={ "product-" + stock.product.id + "-quantity" }/>
                    <button type="button" className="btn btn-number-product rounded-0">
                        <i className="bi bi-plus-lg"></i>
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="col-12 rounded-0 btn btn-primary btn-add-cart">
                        <i id={ "icon-plus-" + stock.product.id } className="bi bi-plus-lg icon-plus"></i> 
                        <i id={ "icon-check-" + stock.product.id } className="bi bi-check-lg icon-check"></i>
                        <span id={ "icon-spinner-" + stock.product.id } className="spinner-border spinner-border-sm icon-spinner" role="status" aria-hidden="true"></span> Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;