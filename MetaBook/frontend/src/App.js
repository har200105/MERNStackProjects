import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
// import{Switch} from 'rea'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Messenger from './Pages/Messenger/Messenger';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {user} = useContext(AuthContext);
  return (

    <Router>

      <Routes>
        
        <Route exact path="/" element={ user ? <Home /> : <Login/>}>
        </Route>

        <Route exact path="/Profile/:id" element={<Profile />}>
        </Route>

        <Route exact path="/Login" element={user ?  <Navigate to="/"/> : <Login />} >
        </Route>

        <Route exact path="/Signup" element={user ?  <Navigate to="/"/> :<Signup />}>
        </Route>

        <Route exact path="/Messenger" element={<Messenger />}>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
