import { useEffect, useState } from "react"
import PurchasesTableRow from "../components/PurchasesTableRow";

import "../styles/Purchases.css";

function Purchases() {
    const [purchases, setPurchases] = useState([]);

    const fetchPurchases = function() {
        fetch("http://127.0.0.1:8000/purchase/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accSession: sessionStorage.getItem("accSession") })
        }).then((res) => res.json())
            .then((data) => {
                if(!data.error)
                    setPurchases(data.purchases);
                else console.log(data);
            });
    };

    useEffect(() => fetchPurchases(), []);

    return (
        <div>
            {purchases.length == 0 ? 
                <div className="container py-5">
                    <div className="mt-5 text-center">
                        <h1 className="text-light fs-5">Purchase Not Found</h1>
                    </div>
                </div>
            :
                <div className="container-fluid">
                    <div className="col-12 col-lg-8 offset-lg-2 bg-success purchases">
                        <table className="table table-hover purchases-table text-light">
                            <thead>
                                <tr>
                                    <th>Purchase ID</th>
                                    <th>Purchase Date</th>
                                    <th>Total Price</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.map((p) => <PurchasesTableRow key={p.purchase.id} item={p} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
}

export default Purchases;