import { useEffect, useState } from "react";
import Product from "../components/Product";
import '../styles/Home.css';

function Home({ cartST, subcategoryId }) {
    const [stocks, setStocks] = useState([]);

    const fetchStocks = function() {
        const url = [
            "http://127.0.0.1:8000/index/api",
            "http://127.0.0.1:8000/fruits-vegetables/api/" + subcategoryId
        ];

        fetch((subcategoryId == undefined) ? url[0] : url[1])
        .then((res) => res.json())
            .then((data) => {
                setStocks(data.stocks);
            });
    };

    useEffect(() => fetchStocks(), [subcategoryId]);

    return (
        <div className="container margin-top">
            <div className="row pt-5">
                <div className="px-3 products">
                    {/* ALERT */}
                    <div className="pt-4"></div>

                    {/* PRODUCTS */}
                    {stocks.length > 0 ?
                        <div className="row">
                            {stocks.map((stock) => (
                                <Product key={stock.product.id} stock={stock} cartST={cartST}/>
                            ))}
                        </div>
                    :
                        <div className="mt-4 text-center">
                            <h1 className="text-light fs-5">Fruit/Vegetable Not Found</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;