import Home from './Screens/Home';
import Register from './Screens/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Login from './Screens/Login';
import Product from './Screens/Product';
import ProductList from './Screens/ProductList';
import Cart from './Screens/Cart';


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route exact path="/signup" element={<Register />} />
        </Routes>
        <Routes>
          <Route exact path="/login" element={<Login />} />
        </Routes>
        <Routes>2
          <Route exact path="/product/:id" element={<Product />} />
        </Routes>
        <Routes>
          <Route exact path="/productList/:category" element={<ProductList />} />
        </Routes>

        <Routes>
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
