import { useEffect, useState } from "react";
import Product from "../components/Product";
import '../styles/Home.css';

function Home() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/index/api")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setStocks(data.stocks);
            });
    }, []);

    return (
        <div className="container">
            <div className="row pt-5">
                <div className="px-3 products">
                    {/* ALERT */}
                    <div className="pt-4"></div>

                    {/* PRODUCTS */}
                    {stocks.length > 0 ?
                        <div className="row">
                            {stocks.map((stock) => (
                                <Product key={stock.product.id} stock={stock}/>
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