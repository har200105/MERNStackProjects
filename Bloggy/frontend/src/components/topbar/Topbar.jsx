import { useContext } from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import { Context } from "../../context/Context";

export default function Topbar() {
  const {user,dispatch} = useContext(Context);
  const Logout = () =>{
    dispatch({type:"LOGOUT"});
    window.location.reload();
  }
  return (
    <div className="top">
      <div className="topLeft">
     <Link to="/" className="link">
        <h1>Shiddat</h1>
      </Link>  
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && <li className="topListItem" onClick={Logout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/Profile">
            <img
              className="topImg"
              src={user?.profilePicture}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
