import { useContext, useRef, useState } from "react";
import { Context } from '../../context/Context';
import "./login.css";
import axios from 'axios';
import { API } from '../../API';
import {useNavigate,Link} from "react-router-dom";

export default function Login() {

  const { dispatch, isFetching } = useContext(Context);
  const navigation = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error,setError] = useState("");
  

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
        navigation("/",{replace:true});
      }else if(logs.data.error){
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
        <input className="loginInput" type="password" placeholder="Enter your password..."  ref={passwordRef} />
        <button className="loginButton" onClick={LoginUser}>Login</button>
      </form>
      <Link to="/register" className="loginRegisterButton" >Register</Link>
      <p style={{
        color:"red"
      }}>{error}</p>
    </div>
  );
}
