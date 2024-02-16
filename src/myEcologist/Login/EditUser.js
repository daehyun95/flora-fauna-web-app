import "./Login.css";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";

const EditUser = () => {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState(null);
  const navigate = useNavigate();

  const updateUser = async (event) => {
    event.preventDefault();
    console.log("in update user : new credentials : ", credentials);
    try {
      const user = await client.updateUser(credentials);
      console.log("returned from server call", user);
      if (user == 403) {
        alert("Failed to update user, please try again later.");
      } else if (user.user_id != null) {
        alert("Update successfull!");
        await fetchCurrentUser();
        navigate(`/Community/${user.user_id}`); // Navigate to the new page
      }
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
      alert("Update failed: " + err.response.data.message);
    }
  };
  function validateForm() {
    return (
      credentials &&
      credentials.user_name.length > 0 &&
      credentials.email.length > 0 &&
      credentials.password.length > 0 &&
      credentials.user_login.length > 0 &&
      credentials.user_role.length > 0
      //credentials.profile_pic.length > 0
    );
  }

  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const getServerCurrentUser = await client.account();
      setCurrentUser(getServerCurrentUser);
      // Set credentials with the fetched user data
      setCredentials({
        user_id: getServerCurrentUser.user_id,
        user_login: getServerCurrentUser.user_login,
        user_name: getServerCurrentUser.user_name,
        email: getServerCurrentUser.email,
        password: getServerCurrentUser.password,
        user_role: getServerCurrentUser.user_role,
        //profile_pic: getServerCurrentUser.profile_pic,
      });
    } catch (err) {
      setError(err);
    }
  };

  const cancel = () => {
    navigate(`/Community/${currentUser.user_id}`); // Navigate to the new page
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="row align-items-center main-login">
      <div className="col-12 col-md-6">
        <h3 className="text-center mb-4">Edit Profile</h3>
        {!credentials ? (
          <div>Loading...</div>
        ) : (
          <Form onSubmit={updateUser} className="login-form">
            <Form.Group className="mb-3" controlId="user_id">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                disabled
                type="number"
                value={credentials.user_id}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="user_login">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={credentials.user_login}
                onChange={(e) =>
                  setCredentials({ ...credentials, user_login: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={credentials.user_name}
                onChange={(e) =>
                  setCredentials({ ...credentials, user_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="user_role">
              <Form.Label>User Role</Form.Label>
              <Form.Control
                as="select"
                value={credentials.user_role}
                onChange={(e) =>
                  setCredentials({ ...credentials, user_role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </Form.Control>
            </Form.Group>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button
                className="form-submit-button mt-3 mb-3"
                size="lg"
                type="submit"
                disabled={!validateForm()}
              >
                Update Profile
              </Button>
              <Button
                className="form-submit-button mt-3 mb-3 ms-2"
                size="lg"
                variant="secondary"
                onClick={cancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </div>
      <div className="col-6 d-none d-md-block">
        <img
          className="login-display-image"
          src="/Images/coyote.svg"
          alt="Profile Display"
        />
      </div>
    </div>
  );
};

export default EditUser;
