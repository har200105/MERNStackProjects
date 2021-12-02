import React, { useEffect } from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import SingleVideo from "./components/singleVideoComponents/SingleVideo";
import SearchPage from "./components/SearchPageComponents/SearchPage";
import VideoUpload from "./components/videoUpload/VideoUpload";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import SingleUser from "./components/singleUser/SingleUser";
import RecommendedVideos from "./components/recommended/RecommendedVideos";
import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import NProgress from "nprogress";

import "../node_modules/nprogress/nprogress.css";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
  }, [location]);

  useEffect(() => {
    NProgress.done(); // Basically to show the red bar we have in youtube while loading #Shiddat
  }, [location]);

  return (
    <div className="app">
      <Switch>
        <Route path="/search/:searchTerm">
          <Header />
          <div className="app__page">
            <Sidebar />
            <SearchPage />
          </div>
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/video/watch/:id">
          <Header />
          <hr />
          <SingleVideo />
        </Route>
        <Route path="/c/:username">
          <Header />
          <hr />
          <div className="app__page">
            <Sidebar />
            <SingleUser />
          </div>
        </Route>
        <Route path="/video/upload">
          <Header />
          <hr />
          <VideoUpload />
        </Route>
        <Route path="/">
          <Header />
          <div className="app__page">
            <Sidebar />
            <RecommendedVideos />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
