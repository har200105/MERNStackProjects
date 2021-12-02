import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { API } from '../../API';
import './Signup.css';

const Signup = () => {
    const email = useRef();
    const password = useRef();
    const name = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();
    
    const handleClick = (e) =>{
        if(confirmPassword.current.value !== password.current.value){
            confirmPassword.current.setCustomValidity("Passwords Don't Match")
        }else{
            const user={
                name:name.current.value,
                email:email.current.value,
                password:password.current.value
            }
            try{
            const response = await axios.post(`${API}/signup`);
            if(response.status===201){
                navigate("/");
            }

        }catch(e){
            console.log(e)
        }
    }
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
                            <input placeholder="Username" required  className="loginInput" ref={name}/>
                            <input placeholder="Email" required  className="loginInput" ref={email} />
                            <input placeholder="Password" required className="loginInput" ref={password} type="password" />
                            <input placeholder="Confirm Password" required className="loginInput" ref={confirmPassword} type="password" />
                            <button className="loginButton" type="submit" onClick={handleClick} >Sign Up</button>
                            <button className="loginRegisterButton">
                                Log into Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;
