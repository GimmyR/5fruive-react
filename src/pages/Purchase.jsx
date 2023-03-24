import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PurchaseTableRow from "../components/PurchaseTableRow";

import "../styles/Purchase.css";

function Purchase() {
    const { purchaseId } = useParams();

    const [purchase, setPurchase] = useState(null);
    const [details, setDetails] = useState([]);
    const [total, setTotal] = useState(0);

    const calculateTotal = function(details) {
        let result = 0;
        details.forEach((detail) => result += (detail.quantity * detail.product.price));
        setTotal(result);
    };

    const add0b = function(nb) {
        let result = "" + nb;
        if(nb < 10)
            result = 0 + result;
        return result;
    };

    const format = function(dateString) {
        let date = new Date(dateString);
        return add0b(date.getDate()) + "/" + add0b(date.getMonth()) + "/" + date.getFullYear();
    };

    const fetchPurchase = function() {
        fetch("http://127.0.0.1:8000/purchase/details/api/" + purchaseId, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accSession: sessionStorage.getItem("accSession") })
        }).then((res) => res.json())
            .then((data) => {
                if(!data.error) {
                    setPurchase(data.purchase);
                    setDetails(data.details);
                    calculateTotal(data.details);
                } else console.log(data);
            });
    };

    useEffect(() => fetchPurchase(), []);

    const savePDF = function() {
        html2canvas(document.querySelector("#invoice")).then(canvas => {
            var a = document.createElement('a');
            a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            a.download = 'invoice.jpg';
            a.click();
        });
    };

    return (
        <div className="container-fluid mt-5 py-5">
            <div className="col-lg-8 offset-lg-2 bg-success invoice">
                {purchase != null ?
                    <div>
                        <div id="invoice" className="bg-success text-light px-3 pt-4 pb-1">
                            <h5 className="invoice-label">
                                <span className="fw-bold">Purchase ID</span> : #{ purchase.id }
                            </h5>
                            <h5 className="invoice-label">
                                <span className="fw-bold">Purchase date</span> : { format(purchase.purchaseDate) }
                            </h5>

                            <table className="table table-hover text-light mt-3 mb-5">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.map((detail) => <PurchaseTableRow key={detail.id} detail={detail}/>)}
                                <tr>
                                    <td></td>
                                    <td>Total</td>
                                    <td></td>
                                    <td></td>
                                    <td>{ total } Ar</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        <button onClick={() => savePDF()} className="btn btn-warning col-md-3 offset-md-9" type="button">Save invoice</button>
                    </div>
                : null }
            </div>
        </div>
    );
}

export default Purchase;