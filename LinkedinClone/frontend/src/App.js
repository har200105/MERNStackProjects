import React, { useContext, useEffect } from "react";
import './App.css';
import Login from './Components/Login';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Logining from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import NProgress from "nprogress";
import { Context } from "./Context/ContextProvider";
import { ContextProvider } from './Context/ContextProvider';
import UserProfile from "./Pages/UserProfile";
import Notification from "./Pages/Notification";
import Rightside from "./Components/RightSide";
import Profile from "./Pages/Profile";

function App() {

  const { user } = useContext(Context);
  console.log(user)

  // const location = useLocation();  
  // useEffect(() => {
  //   NProgress.start();
  //   setTimeout(()=>{
  //     NProgress.done();
  //   },5000)
  // }, []);

  // useEffect(() => {
  //   NProgress.done(); 
  // }, []);



  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              {
                user ? <Redirect to="/home" /> : <Login />
              }
            </Route>
            <Route exact path="/home">

              {

                user ?
                  <>
                    <Header />
                    <Home />
                  </>
                  :
                  <Redirect to="/login" />

              }

            </Route>
            <Route exact path="/login">
              {
                user ? <Redirect to="/home" /> : <Logining />
              }

            </Route>
            <Route exact path="/signup">
              {
                user ? <Redirect to="/home" /> : <Signup />
              }

            </Route>
            <Route exact path="/userprofile/:id">
              {
                user ? <>
                  <Header />
                  <UserProfile />

                </>
                  : <Redirect to="/login" />
              }

            </Route>
            <Route exact path="/notifications">
              {
                user ? <>
                  <Header />
                  <Notification />
                </> : <Redirect to="/login" />
              }

            </Route>

            <Route exact path="/profile">
              {
                user ? <>
                  <Header />
                  <Profile />
                </> : <Redirect to="/login" />
              }

            </Route>
          </Switch>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
