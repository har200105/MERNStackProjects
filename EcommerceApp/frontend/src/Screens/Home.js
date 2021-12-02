import React from "react";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Products from "../Components/Products";
import Slider from "../Components/Slider";

const Home = () => {
  return (
    <div>

      <Slider />
      <Categories />
      <Products/>
      <Footer/>
    </div>
  );
};

export default Home;