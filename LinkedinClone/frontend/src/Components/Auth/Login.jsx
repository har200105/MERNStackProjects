import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../API.js';
import { Context } from '../../Context/ContextProvider.js';




const LoginValues = {
  email: "",
  password: "",
}


const Logining = () => {
  const { dispatch, isFetching } = useContext(Context);
  const [error,setError] = useState("");
  const [Login, setLogin] = useState(LoginValues);
  const history = useHistory();

  const inputChange = (e) => {
    setLogin({ ...Login, [e.target.name]: e.target.value });
    console.log(Login);
  }

  const LoginUser = async () => {
    const url = `${API}/signin`;
    const res = await axios.post(url, Login);
    dispatch({ type: 'LOGIN_START' });

    if (res.status===201) {
      console.log(res.data);  
      localStorage.setItem("jwt", res.data.token);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.exist });
      // history.push('/home');
      window.location.reload();
    } else {
      setError("Invalid Credentials");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }

  return (
    <div>
      <img src="/images/login-logo.svg" alt=""
        style={{
          height: "80px",
          width: "200px",
          alignItems: "center",
          marginLeft: "42%",
          marginTop: "10%"
        }}
      />
      <div id="app__container">

        <main class="app__content">

          <div class="header__content">
            <h1 class="header__content__heading">Sign In </h1>
            <p class="header__content__subheading">Stay updated on your professional world</p>
          </div>
          <div class="login__form new_form">
            <div class="form__input--floating">
              <label class="form__label--floating" id="label--email" />
              <input id="input--email" placeholder="Email or Phone"
                name="email"
                onChange={(e) => inputChange(e)}
              />
            </div>
            <div class="form__input--floating">
              <label class="form__label--floating" id="label--password" />
              <input id="input--password" type="password" placeholder="Password"
                name="password"
                onChange={(e) => inputChange(e)}
              />
            </div>
            <div class="login__form_action_container login__form_action_container--multiple-actions">
              <button class="btn__primary--large from__button--floating"
                onClick={LoginUser}
                aria-label="Sign in">Sign in</button>
            </div>
          </div>
          <div class="footer-app-content-actions">
            <div>
              <Link to="/signup"  style={{
                 textDecoration:"none"
              }}>
                <p>
                  New to LinkedIn?
                  <a>Join now</a>
                </p>
              </Link>
             <p>{error}</p> 
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Logining;
