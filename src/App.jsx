import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Fruits from './pages/Fruits';
import Home from './pages/Home';
import Vegetables from './pages/Vegetables';
import ModalSignIn from './components/ModalSignIn';
import Cart from './pages/Cart';
import Purchases from './pages/Purchases';
import Purchase from './pages/Purchase';
import Validate from './pages/Validate';
import Sort from './components/Sort';

function App() {
	const [cart, setCart] = useState(0);
	const cartST = { cart: cart, setCart: setCart };

    const [account, setAccount] = useState(null);
	const accountST = { account: account, setAccount: setAccount };

	const [show, setShow] = useState(false);
	const showST = { show: show, setShow: setShow };

	const fetchAccount = function() {
        fetch("http://127.0.0.1:8000/account/auth/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accSession: sessionStorage.getItem("accSession") })
        }).then((res) => res.json())
            .then((data) => {
                accountST.setAccount(data.account);
            });
    };
	
	return (
		<Router>
	      <Navbar cartST={cartST} accountST={accountST} fetchAccount={fetchAccount} showST={showST}/>
	      <Sort/>
		  <Routes>
	        <Route exact path="/" element={ <Home cartST={cartST}/> }/>
			<Route exact path="/Search" element={ <Home cartST={cartST} isSearching={true}/> }/>
	        <Route path="/Fruits/:subcategoryId" element={ <Fruits cartST={cartST}/> }/>
	        <Route path="/Vegetables/:subcategoryId" element={ <Vegetables cartST={cartST}/> }/>
			<Route path="/Cart" element={ <Cart cartST={cartST} showST={showST}/> }/>
			<Route path="/Validate" element={ <Validate/> }/>
			<Route path="/Purchases" element={ <Purchases/> }/>
			<Route path="/Purchase/:purchaseId" element={ <Purchase/> }/>
	      </Routes>
	      <ModalSignIn fetchAccount={fetchAccount} showST={showST}/>
	    </Router>
	);
}

export default App;