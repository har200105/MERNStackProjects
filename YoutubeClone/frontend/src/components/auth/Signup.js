import React, { useState, useEffect } from "react";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import GoogleLogo from "../../images/googleLogo.svg";
import { useHistory, Link } from "react-router-dom";
import { isAuth, signup } from "../../actions/auth";
import Alert from "@material-ui/lab/Alert";

const Signup = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
   
    e.preventDefault();

    const userToBeMade = { name, email, password };

    signup(userToBeMade)
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setError("");
          setSuccess("Signup success Now please login");
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isAuth()) {
      history.push("/");
    }
  }, [history]);

  return (
    <div className="login">
      <div className="login__box">
        <center>
          <img
            className="login__googleLogo"
            src={GoogleLogo}
            alt="google logo"
          />
        </center>
        <h2>Sign Up</h2>
        <br />
        <p>
          Make A New <b>Account</b>
        </p>
        {error && (
          <Alert severity="error" style={{ marginLeft: "15px" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" style={{ marginLeft: "15px" }}>
            {success}
          </Alert>
        )}
        <br />
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ width: "90%", marginLeft: "20px", marginBottom: "15px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Username"
            type="text"
            variant="outlined"
          />
          <TextField
            style={{ width: "90%", marginLeft: "20px", marginBottom: "15px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
          />
          <TextField
            style={{ width: "90%", marginLeft: "20px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
          />
          <br />
          <br />
          <Link to="/signin" style={{ textDecoration: "none", color: "blue" }}>
            Aldready have a account ?
          </Link>
          <input type="submit" name="sign-in" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
