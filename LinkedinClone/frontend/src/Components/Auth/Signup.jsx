import React, { useContext, useState } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API } from '../../API.js';



const SignupValues = {
    name:"",
    email: "",
    password: "",
}


const Signup = () => {
    const [signup,setSignup] =  useState(SignupValues);
    const history = useHistory("");

    const inputChange = (e)=>{
        setSignup({...signup,[e.target.name]:e.target.value});
        console.log(signup)
    }

    const SignupUser=async()=>{
        const url = `${API}/signup`;
       const res = await axios.post(url,signup);
       if(res.status===201){
         history.push('/login');
       }
    }

    return (
        <div>
            <img src="/images/login-logo.svg" 
            alt=""
            style={{
                height:"80px",
                width:"200px",
                alignItems:"center",
                marginLeft:"42%",
                marginTop:"10%"
            }}
            />

            <h1 class="header__content__heading" style={{
                marginLeft:"440px"
            }}>Make the most of your professional Life</h1>
            <div id="app__container">
            <main class="app__content">
              <div class="header__content">
               
              </div>
              <div class="login__form new_form">

              <div class="form__input--floating">
              <label class="form__label--floating" id="label--password"/>
              <input id="input--password"  placeholder="Name"
              name="name"
              onChange={(e)=>inputChange(e)}
              />
            </div>

                <div class="form__input--floating">
                  <label class="form__label--floating" id="label--email"/>             
                       <input id="input--email"  placeholder="Email or Phone" 
                       name="email"
                       onChange={(e)=>inputChange(e)}
                       />
                </div>
                <div class="form__input--floating">
                  <label class="form__label--floating" id="label--password"/>
                  <input id="input--password" type="password"  placeholder="Password"
                  name="password"
                  onChange={(e)=>inputChange(e)}
                  />
                </div>


                <div class="login__form_action_container login__form_action_container--multiple-actions">
                  <button class="btn__primary--large from__button--floating" 
                  onClick={SignupUser} 
                  aria-label="Sign in">Agree & Join</button>
                </div>
              </div>
              <div class="footer-app-content-actions">
                <div>
              <Link to="/login" style={{
                 textDecoration:"none"
              }}>
                <p>
                  Already on LinkedIn?
                  <a>Sign In</a>
                </p>
              </Link>
              </div>
              </div>
            </main>
          </div>
        </div>
    )
}

export default Signup;
