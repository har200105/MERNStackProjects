import { useRef, useState } from "react";
import "./register.css";
import axios from 'axios';
import { API } from '../../API';
import { Link } from "react-router-dom";

export default function Register() {

  const [error, setError] = useState("");
  const [msg,setMsg] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [profileImg,setProfileImg] = useState();

  const readImage = (e) =>{
    console.log(e);
    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState===2){
        setProfileImg(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]) 
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError(false);
    try {

      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value))){
        setMsg("Invalid Email Address");
        return;
      }

      console.log(passwordRef.current.value.length);

      if(passwordRef.current.value.length < 6){
        setMsg("Password Should Be Minimum of Length 6");
        return;
      }


      const res = await axios.post(`${API}/signup`, {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        file:profileImg
      });
      res.status === 201 && window.location.replace("/login");
      res.status === 401 && setError(res.data.error)
      
    } catch (err) {
      setError("Something Went Wrong");
    }
  };

  return (
    <div className="register">
      <form className="registerForm">
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username...."
          ref={nameRef} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email...."
          ref={emailRef} 
          onChange={()=>setMsg("")}
          />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password...."
          ref={passwordRef} 
          onChange={()=>setMsg("")}
          />
      <input type="file" className="registerButton" name="UploadImage" onChange={readImage} />
        <button className="registerButton" onClick={registerUser}>Register</button>
        <p style={{ color: "red" }} >{error}</p>
      </form>
      <Link to="/login" className="registerLoginButton">Login</Link>
      <p style={{color:"red"}}>{msg}</p>
    </div>
  )
}
