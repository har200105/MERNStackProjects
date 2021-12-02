import React, { useState, useEffect } from "react";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import GoogleLogo from "../../images/googleLogo.svg";
import { useHistory, Link } from "react-router-dom";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Alert from "@material-ui/lab/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    signin({ email, password })
      .then((res) => {
        console.log(res)
        if (res.data.error) {
          setError(res.data.error);
        } else {
          authenticate(res, () => {
            console.log(res);
            setError("");
            setSuccess("Login success");
            history.push("/");
          });
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
        <h2>Sign In</h2>
        <br />
        <p>
          to continue to <b>YouTube</b>
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
          <Link to="/signup" style={{ textDecoration: "none", color: "blue" }}>
            Create account
          </Link>
          <input type="submit" name="sign-in" value="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default Login;
