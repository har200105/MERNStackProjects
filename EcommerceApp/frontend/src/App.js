import Home from './Screens/Home';
import Register from './Screens/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';


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
        <Routes>
          <Route exact path="/product" element={<Product />} />
        </Routes>
        <Routes>
          <Route exact path="/productList" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
