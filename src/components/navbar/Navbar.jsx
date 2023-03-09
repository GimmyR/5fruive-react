import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Category from '../category/Category';
import Subcategory from '../subcategory/Subcategory';
import './Navbar.css';

function Navbar() {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/navbar/index")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.categories);
                setSubcategories(data.subcategories);
            });
    }, []);

    return (
        <div className="container-fluid bg-dark py-2 fixed-top">
            <div id="nav-row" className="row d-flex align-items-center">
                {/* BUTTON TOGGLER */}
                <div className="col-2 col-sm-2 col-md-2 d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none d-flex justify-content-center">
                    <button className="btn btn-outline-secondary btn-toggler px-2 py-0 border-0" type="button">
                        <i className="bi bi-list menu-icon"></i>
                    </button>
                </div>

                {/* BRAND */}
                <div className="col-5 col-sm-5 col-md-6 col-lg-1 d-flex justify-content-center">
                    <Link className="text-decoration-none navbar-logo align-self-center" to="/">5fruive</Link>
                </div>

                {/* NAV #1 */}
                <div id="nav1" className="col-lg-7 d-none d-sm-none d-md-none d-lg-flex text-secondary">
                    <div className="row">
                        {/* HOME */}
                        <div className="col-lg">
                            <Link className="nav-link nav-link-custom" to="/">Home</Link>
                        </div>

                        {/* CATEGORIES */}
                        {categories.map((category) => 
                            <Category key={category.id} category={category} subcategories={subcategories}/>
                        )}

                        {/* ABOUT */}
                        <div className="col-lg">
                            <Link className="nav-link nav-link-custom" to="#">About</Link>
                        </div>
                    </div>
                </div>

                {/* NAV #2 */}
                <div id="nav2" className="col-5 col-sm-5 col-md-4 col-lg-4 d-flex justify-content-end text-secondary">
                    <div className="row">
                        {/* SEARCH */}
                        <div className="col">
                            <a className="nav-link nav-link-custom" data-bs-toggle="offcanvas" href="#offcanvasSort">
                                <i className="bi bi-search"></i>
                            </a>
                        </div>

                        {/* LOGIN */}
                        <div className="col">
                            <a className="nav-link nav-link-custom d-flex align-items-center" href="#">
                                <i className="bi bi-person-circle d-inline me-1"></i> 
                                <span className="d-none d-sm-none d-md-none d-lg-block">Login</span>
                            </a>
                        </div>

                        {/* CART */}
                        <div className="col">
                            <a className="nav-link nav-link-custom d-flex align-items-center" href="/cart/">
                                <i className="bi bi-cart4 position-relative me-1"></i>
                                <span id="cart-count" className="cart-count">0</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;