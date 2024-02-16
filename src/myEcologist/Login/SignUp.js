import "./Login.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";

const SignUp = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    user_id: "",
    user_login: "",
    user_name: "",
    email: "",
    password: "",
    user_role: "",
  });
  const navigate = useNavigate();

  const signup = async (event) => {
    event.preventDefault();
    console.log("in signup");
    try {
      const user = await client.signup(credentials);
      console.log("returned from server call", user);
      if (user == 200) {
        alert("User_ID already taken. Try again.");
      } else {
        alert("Signup successful! Log into your account.");
        navigate("../Login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
      alert("Signup failed: " + err.response.data.message);
    }
  };
  function validateForm() {
    return (
      credentials.user_name.length > 0 &&
      credentials.email.length > 0 &&
      credentials.password.length > 0 &&
      credentials.user_id > 0 &&
      credentials.user_login.length > 0 &&
      credentials.user_role.length > 0 &&
      agreeTerms
    );
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
          <h3>Sign Up</h3>
        </div>
        <Form className="row w-50 custom-width login-form" onSubmit={signup}>
          <Form.Group className="mt-3" size="lg" controlId="user_id">
            <Form.Control
              autoFocus
              type="number"
              value={credentials.user_id}
              placeholder="User Id"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  user_id: parseInt(e.target.value, 10) || "",
                })
              }
              onWheel={(e) => e.target.blur()}
            />
          </Form.Group>
          <Form.Group className="mt-3" size="lg" controlId="user_login">
            <Form.Control
              type="text"
              value={credentials.user_login}
              placeholder="Username"
              onChange={(e) =>
                setCredentials({ ...credentials, user_login: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mt-3" size="lg" controlId="username">
            <Form.Control
              type="text"
              value={credentials.user_name}
              placeholder="Name"
              onChange={(e) =>
                setCredentials({ ...credentials, user_name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mt-3" size="lg" controlId="email">
            <Form.Control
              type="email"
              value={credentials.email}
              placeholder="Email"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
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
          <Form.Group className="mt-3" size="lg" controlId="user_role">
            <Form.Control
              as="select"
              value={credentials.user_role}
              onChange={(e) =>
                setCredentials({ ...credentials, user_role: e.target.value })
              }
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="moderator">moderator</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="agreeTerms" className="mb-2 mt-2">
            <Form.Check
              type="checkbox"
              label="I agree to all terms and conditions"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
          </Form.Group>

          <Button
            className="form-submit-button mt-3 mb-3"
            block
            size="lg"
            type="submit"
            disabled={!validateForm()}
          >
            Sign Up
          </Button>
        </Form>
      </div>

      <div className="col-6 d-none d-md-block">
        <img
          className="login-display-image"
          src="/Images/coyote.svg"
          alt="Login Display"
        />
      </div>
    </div>
  );
};

export default SignUp;
