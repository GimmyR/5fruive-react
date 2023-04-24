import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sort.css';

function Sort() {
    const navigate = useNavigate();
    const [regions, setRegions] = useState([]);

    const [name, setName] = useState("");
    const [region, setRegion] = useState(0);
    const [lowestPrice, setLowestPrice] = useState("");
    const [highestPrice, setHighestPrice] = useState("");

    const fetchRegions = function() {
        fetch("http://127.0.0.1:8000/region/api")
            .then((res) => res.json())
                .then((data) => {
                    if(!data.error)
                        setRegions(data.regions);
                });
    };

    const searchProducts = function() {
        let body = {
            name: name,
            region: region,
            lowestPrice: lowestPrice,
            highestPrice: highestPrice
        };
        
        fetch("http://127.0.0.1:8000/index/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then((res) => res.json())
            .then((data) => {
               //localStorage.setItem("search", body);
               localStorage.setItem("stocks", JSON.stringify(data.stocks));
               navigate("/Search");
            });
    };

    useEffect(() => fetchRegions(), []);

    return (
        <div className="offcanvas offcanvas-start sort" tabIndex="-1" id="offcanvasSort">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Sort By</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body">
                <form className="mt-4">
                    <input value={name} onChange={(e) => setName(e.target.value)} className="form-control rounded-0 mb-2" type="text" placeholder="Name"/>
                    <select value={region} onChange={(e) => setRegion(parseInt(e.target.value))} className="form-select rounded-0 mb-2">
                        <option value="">Region</option>
                        {regions.map((r) => 
                            <option key={r.id} value={r.id}>{r.name}</option>
                        )}
                    </select>
                    <input value={lowestPrice} onChange={(e) => setLowestPrice(parseInt(e.target.value))} type="number" className="form-control rounded-0 mb-2" min="0" placeholder="Lowest Price"/>
                    <input value={highestPrice} onChange={(e) => setHighestPrice(parseInt(e.target.value))} type="number" className="form-control rounded-0 mb-2" min="0" placeholder="Highest Price"/>
                    <button onClick={() => searchProducts()} className="col-md-12 btn btn-success rounded-0 mt-1" type="button">Search</button>
                </form>
            </div>
        </div>
    );
}

export default Sort;