import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import Subcategory from './Subcategory';
import '../styles/Navbar.css';

function Navbar({ cartState }) {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [account, setAccount] = useState(null);

    const login = function() {
        console.log("LOGIN ?");
    };

    useEffect(() => {
        fetch("http://127.0.0.1:8000/navbar/index", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ cartSession: sessionStorage.getItem("cartSession") })
        }).then((res) => res.json())
            .then((data) => {
                setCategories(data.categories);
                setSubcategories(data.subcategories);
                setAccount(data.account);
                if(data.cartCount != null);
                    cartState.setCart(data.cartCount);
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
                        {account != null ?
                            <div className="dropdown col">
                                <a className="nav-link nav-link-custom d-flex align-items-center" href="#" data-bs-toggle="dropdown">
                                    <i className="bi bi-person-circle me-1"></i> 
                                    <span className="d-none d-sm-none d-md-none d-lg-block">{ account.username }</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark navbar-dropdown text-center">
                                    <li>
                                        <a className="dropdown-item" href="/purchase/">
                                            <i className="bi bi-receipt"></i> Purchases
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="bi bi-gear"></i> Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onclick="signOut()">
                                            <i className="bi bi-box-arrow-right"></i> Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        :
                            <div className="col">
                                <Link onClick={() => login()} className="nav-link nav-link-custom d-flex align-items-center" to="#" data-bs-toggle="modal" data-bs-target="#modal-sign-in">
                                    <i className="bi bi-person-circle d-inline me-1"></i> 
                                    <span className="d-none d-sm-none d-md-none d-lg-block">Login</span>
                                </Link>
                            </div>
                        }

                        {/* CART */}
                        <div className="col">
                            <a className="nav-link nav-link-custom d-flex align-items-center" href="/cart/">
                                <i className="bi bi-cart4 position-relative me-1"></i>
                                <span id="cart-count" className="cart-count">{ cartState.cart }</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;