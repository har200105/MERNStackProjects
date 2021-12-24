import { useContext, useRef, useState } from "react";
import { Context } from '../../context/Context';
import "./login.css";
import axios from 'axios';
import { API } from '../../API';
import { useNavigate, Link } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {

  const { dispatch, isFetching } = useContext(Context);
  const navigation = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);


  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }



  const LoginUser = async (e) => {
    e.preventDefault();
    console.log(dispatch);

    try {
      const logs = await axios.post(`${API}/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value
      });

      dispatch({ type: 'LOGIN_START' });
      
      if (logs.status === 201) {
        console.log(logs);
        localStorage.setItem("jwt", logs.data.token);
        dispatch({ type: "LOGIN_SUCCESS", payload: logs.data });
        handleClick();
        navigation("/", { replace: true });
      } else if (logs.data.error) {
        setError("Invalid Credentials");
      }
    } catch (e) {
      setError("Invalid Credentials");
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(e);
    }

  }

  return (
    <div className="login">
      <form className="loginForm">
        <label>Email</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." ref={emailRef} />
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef} />
        <button className="loginButton" onClick={LoginUser}>Login</button>
      </form>
      <Link to="/register" className="loginRegisterButton" >Register</Link>
      <p style={{
        color: "red"
      }}>{error}</p>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Logged In Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
