import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import db from "../Database";
import "./index.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";
import * as client from "../Login/client";
import { Dropdown } from "react-bootstrap";

import { search } from "../Header/client";
function Header() {
  const [error, setError] = useState("");
  const { observationId } = useParams();
  const observation = db.observations.find(
    (obs) => obs.id === parseInt(observationId)
  );
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };

  const signout = async () => {
    try {
      await client.signout();
      navigate("/Login");
    } catch (err) {
      console.error(err);
      alert("Failed to sign out.");
    }
  };
  const { id } = useParams();

  const gotoProfile = () => {
    navigate(`/Community/${currentUser.user_id}`); // Navigate to the new page
  };
  const findUserById = async (id) => {
    console.log("id :", id);
    const user = await client.findUserById(id);
    console.log("user:", user);
    setAccount(user);
  };

  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const getServerCurrentUser = await client.account();
      setCurrentUser(getServerCurrentUser);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const [query, setQuery] = useState("");
  useEffect(() => {
    //search(observation.common_name).then((results) => setQuery(results));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg wd-header">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/Images/myEcologist.svg"
            height="27"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler wd-icon"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <RxHamburgerMenu />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/Home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to = "/Explore" className="nav-link">
                Explore
              </Link>

            </li>
            <li className="nav-item">
              <Link to="/Community" className="nav-link" >
                Community
              </Link>
            </li>
          </ul>

          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate("/Results/" + query);
                }
              }}
            />
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={() => {
                navigate("/Results/" + query);
              }}
            >
              <AiOutlineSearch />
            </button>
          </form>

          <ul className="navbar-nav ms-2 mb-2 mb-lg-0">
            {currentUser ? (
              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  id="dropdown-custom-components"
                  style={{
                    backgroundColor: "transparent",
                    color: "inherit",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <img
                    src={currentUser.profile_pic}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "5px",
                    }}
                  />
                  Profile
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as="button" onClick={gotoProfile}>
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as="button" onClick={signout}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/Login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
