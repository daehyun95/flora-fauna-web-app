import React, { useState, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import * as client from "./client";

function Community() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    const getUsers = await client.fetchUsers();
    setUsers(getUsers);
  };

  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const getServerCurrentUser = await client.account();
      setCurrentUser(getServerCurrentUser);
      console.log("server current Users :");
      console.log(getServerCurrentUser);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  return (
    <div>
      {error && (
        <div className="alert alert-danger">Please Login to view this page</div>
      )}

      <div style={{ width: "100%", height: "70px" }}>
        <h2>The People of Ecologist</h2>
      </div>

      <div>
        <ul className="nav wd-header" style={{ height: "70px" }}>
          <li
            className="d-flex align-items-center col-lg "
            style={{ marginLeft: "5%" }}
          >
            Recently Active
          </li>
          <Link
            to="/people"
            className="d-flex align-items-center custom-nav-link active col-lg-2 col-md-1"
          >
            <br />
            People
          </Link>
          <Link
            to="/forum"
            className="d-flex align-items-center custom-nav-link col-lg-2 col-md-1"
          >
            <br />
            Forum
          </Link>
          <Link
            to="/leaderboard"
            className="d-flex align-items-center custom-nav-link col-lg-2 col-md-1"
          >
            <br />
            Leaderboard
          </Link>
        </ul>
      </div>

      <div
        className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-xl-6 g-4 wd-dashboard-grid"
        style={{ marginTop: 8 }}
      >
        {currentUser && (
          <>
            {users.map((user) => (
              <Link
                key={user.user_id}
                to={`/community/${user.user_id}`}
                className="card custom-mx-0"
              >
                <img
                  className="card-head"
                  src={user.profile_pic}
                  alt={user.user_name}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ marginTop: 10 }}>
                    {user.user_name} {user.login_count}
                  </h5>
                  <p className="card-text">{user.email}</p>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Community;
