import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Fruits from './pages/Fruits';
import Home from './pages/Home';
import Vegetables from './pages/Vegetables';
import ModalSignIn from './components/ModalSignIn';

function App() {
	const [cart, setCart] = useState(0);
	
	return (
		<Router>
	      <Navbar cartState={ {cart: cart, setCart: setCart} }/>
	      <Routes>
	        <Route exact path="/" element={ <Home cartState={ {cart: cart, setCart: setCart} }/> }/>
	        <Route path="/Fruits/:subcategory" element={ <Fruits/> }/>
	        <Route path="/Vegetables/:subcategory" element={ <Vegetables/> }/>
	      </Routes>
	      <ModalSignIn/>
	    </Router>
	);
}

export default App;