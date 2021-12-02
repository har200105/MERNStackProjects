import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbars from './Component/Navbar';
import StreetFood from "./Component/StreetFood";
import Navs from "./Component/Navs";
import HomeScreen from "./Screens/HomeScreen";
import CartScreen from "./Screens/CartScreen";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import AdminScreen from "./Screens/AdminScreen";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbars />
        <Navs />
        <Switch>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Signup" component={Signup}/>
          <Route path="/streetfood" component={StreetFood} exact />
          <Route path="/" component={HomeScreen} exact />
          <Route exact path="/cart" component={CartScreen} />
          <Route  path="/admin" component={AdminScreen} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
