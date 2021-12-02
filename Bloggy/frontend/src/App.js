import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import EditProfile from "./pages/EditProfile/EditProfile";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import './App.css';
import CategoryPost from "./pages/CategoryPost/CategoryPost";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Homepage />}>
        </Route>
      </Routes>
      <Routes>
        <Route path="/register" element={user ? <Homepage /> : <Register />}>
        </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={user ? <Homepage /> : <Login />}></Route>
      </Routes>
      <Routes>
        <Route path="/post/:id" element={<Single />}>
        </Route>
      </Routes>
      <Routes>
        <Route path="/write" element={user ? <Write /> : <Login />} ></Route>
      </Routes>

      <Routes>
        <Route path="/EditProfile" element={ user ?  <EditProfile /> : <Login/>}>
        </Route>
      </Routes>

      <Routes>
        <Route path="/getCatPost/:category" element={<CategoryPost />}>
        </Route>
      </Routes>

      <Routes>
        <Route path="/userProfile/:id" element={<UserProfile />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;