import "./Login.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";

const Login = () => {
  const [credentials, setCredentials] = useState({
    user_id: "",
    password: "",
  });
  const navigate = useNavigate();
  const signin = async (event) => {
    event.preventDefault();

    try {
      const user = await client.signin(credentials);
      if (!user) {
        alert("Incorrect Username/Password");
      } else {
        console.log("Logged in successfully");
        const userId = user.user_id;
        console.log(user);
        navigate(`/Community/${userId}`); // Navigate to the new page
      }
    } catch (err) {
      console.error(err);
      alert(
        "Signin failed: " + (err.response?.data?.message || "Unknown error")
      );
    }
  };

  function validateForm() {
    return credentials.user_id > 0 && credentials.password.length > 0;
  }

  return (
    <div className="row background-color-left align-items-center main-login">
      <div className="col-12 col-md-6 text-center">
        <div className="row company-logo mb-3">
          <Link to="#">
            <img
              src="/Images/myEcologist.svg"
              height="35"
              className="d-inline-block align-text-top"
            />
          </Link>
        </div>
        <div className="row mb-3">
          <h3>Login</h3>
        </div>
        <Form className="row w-50 custom-width login-form" onSubmit={signin}>
          <Form.Group size="lg" controlId="user_id">
            <Form.Control
              autoFocus
              type="number"
              value={credentials.user_id}
              placeholder="User ID"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  user_id: parseInt(e.target.value, 10) || "",
                })
              }
              onWheel={(e) => e.target.blur()}
            />
          </Form.Group>

          <Form.Group className="mt-3" size="lg" controlId="password">
            <Form.Control
              type="password"
              value={credentials.password}
              placeholder="Password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </Form.Group>

          <Button
            className="form-submit-button mt-3"
            block={"true"}
            size="lg"
            type="submit"
            disabled={!validateForm()}
          >
            Login
          </Button>
        </Form>
        <div className="row mt-3 mb-3">
          <Link className="signup-link" to={`/Signup`}>
            Don't have an account? Sign up.
          </Link>
        </div>
      </div>
      <div className="col-6 d-none d-md-block">
        <img className="login-display-image" src="/Images/seaLion.svg"></img>
      </div>
    </div>
  );
};

export default Login;
