import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbars from './Component/Navbar';
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
          <Route exact path="/" component={HomeScreen}  />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/AdminPanel" component={AdminScreen} />
          <Route exact path="/RestaurantPanel" component={AdminScreen} />

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
