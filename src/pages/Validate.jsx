import { useEffect, useState } from "react";

function Validate() {
    const [regions, setRegions] = useState([]);

    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [address, setAddress] = useState("");

    const fetchRegions = function() {
        fetch("http://127.0.0.1:8000/region/api")
            .then((res) => res.json())
                .then((data) => {
                    if(!data.error)
                        setRegions(data.regions);
                });
    };

    useEffect(() => fetchRegions(), []);

    const validatePurchase = function() {
        let body = {
            region: region,
            city: city,
            neighbourhood: neighbourhood,
            address: address,
            accSession: sessionStorage.getItem("accSession"),
            cartSession: sessionStorage.getItem("cartSession")
        };

        fetch("http://127.0.0.1:8000/purchase/validate/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then((res) => res.json())
            .then((data) => {
                if(!data.error)
                    document.location.href = "/Purchase/" + data.purchase;
                else console.log(data);
            });
    };

    return (
        <div className="container-fluid mt-5 py-5">
            <div className="col-10 offset-1 col-lg-6 offset-lg-3 px-5 py-3 rounded bg-success text-light coordinates">
                <form>
                    <div className="mb-3">
                        <label className="form-label coordinates-label">Region</label>
                        <select value={region} onChange={(e) => setRegion(e.target.value)} className="form-select coordinates-form" id="delivery-region">
                            {regions.map((r) => 
                                <option key={r.id} value={r.name}>{ r.name }</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label coordinates-label">City</label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className="form-control coordinates-form" id="delivery-city" placeholder="i.e: Antananarivo"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label coordinates-label">Neighbourhood</label>
                        <input value={neighbourhood} onChange={(e) => setNeighbourhood(e.target.value)} type="text" className="form-control coordinates-form" id="delivery-neighbourhood" placeholder="i.e: Antanimena"/>
                    </div>
                    <div className="mb-4">
                        <label className="form-label coordinates-label">Address</label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control coordinates-form" id="delivery-address" placeholder="i.e: B60 Bis"/>
                    </div>
                    <button onClick={() => validatePurchase()} type="button" className="btn btn-warning coordinates-btn col-12 mb-4">Validate purchase</button>
                </form>
            </div>
        </div>
    );
}

export default Validate;