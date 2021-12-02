import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../services/apihit';
import './Login.css';
import {CircularProgress} from '@material-ui/core'

const Login = () => {
    const email = useRef();
    const password = useRef();
    const {user,isFetching,error,dispatch} = useContext(AuthContext);
    const handleLogin=(e)=>{
        e.preventDefault();
        login({email:email.current.value,password:password.current.value});
    }

    return (
        <>
            <div className="login">
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <h3 className="loginLogo">Metabook</h3>
                        <span className="loginDesc">
                            Connect with friends and the world around you on Metabook
                        </span>
                    </div>
                    <div className="loginRight">
                        <div className="loginBox">
                            <input placeholder="Email" className="loginInput" required type="email"
                            ref={email}
                            />
                            <input placeholder="Password" className="loginInput"
                             required type="password" minLength="8"
                             ref={password}
                             />
                            <button className="loginButton">{isFetching ? <CircularProgress/> : "Log In" }</button>
                            <span className="loginForgot">Forgot Password?</span>
                            <button className="loginRegisterButton">
                                Create a New Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
