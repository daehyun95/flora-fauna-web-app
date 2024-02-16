import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
// import db from '../Database';
import { Link, Route, useParams } from "react-router-dom";
import * as client from "./client";
import * as user_client from "../Community/client";
import React, { useEffect, useState } from "react";
//import { useSelector, useDispatch } from "react-redux";

function Explore() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  const fetchCurrentUser = async () => {
    try {
      const user = await user_client.account();
      console.log("currentUser ", user);
      setCurrentUser(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const [observations, setObservations] = useState([]);
  const [observation, setObservation] = useState({});

  const fetchObservations = async () => {
    const getObservations = await client.fetchExplores();
    setObservations(getObservations);
  };

  const deleteObservation = async (id) => {
    const deletedObservation = await client.deleteExplore(id);
    setObservations(
      observations.filter(
        (observation) => observation.id !== deletedObservation.id
      )
    );
    const updatedObservations = await client.fetchExplores();
    setObservations(updatedObservations);
  };

  const addObservations = async () => {
    const newId = new Date().getTime();

    const newObservation = {
      id: newId,
      user_id: currentUser.user_id,
      user_name: currentUser.user_name,
      url: "https://source.unsplash.com/random/300x300?sig=incrementingIdentifier",
      image_url:
        "https://source.unsplash.com/random/300x300?sig=incrementingIdentifier",
      ...observation,
    };

    const addedObservation = await client.createExplore(newObservation);
    setObservations([addedObservation, ...observations]);
    setObservation({ id: newId });
  };

  const updateObservations = async () => {
    const updatedObservation = await client.updateExplore(observation);
    setObservations(
      observations.map((obs) =>
        obs.id === updatedObservation.id ? updatedObservation : obs
      )
    );
    const updatedObs = await client.fetchExplores();
    setObservations(updatedObs);
  };

  // species and observers details(number and unique)
  const uniqueSpecies = new Set(
    observations.map((observation) => observation.species_guess)
  );
  const userNames = observations.map((observation) => observation.user_name);
  const numUniqueObservers = new Set(userNames);
  const uniqueObservers = Array.from(numUniqueObservers);

  const itemsPerPage = 39;
  const maxPageNumbersToShow = 9;

  // Observations
  const [currentPageObservations, setCurrentPageObservations] = useState(1);
  const totalPagesObservations = Math.ceil(observations.length / itemsPerPage);
  const pageNumbersObservations = Array.from(
    { length: totalPagesObservations },
    (_, index) => index + 1
  );
  let startPageObservations = Math.max(
    1,
    currentPageObservations - Math.floor(maxPageNumbersToShow / 2)
  );
  let endPageObservations = Math.min(
    totalPagesObservations,
    startPageObservations + maxPageNumbersToShow - 1
  );
  if (endPageObservations - startPageObservations + 1 < maxPageNumbersToShow) {
    startPageObservations = endPageObservations - maxPageNumbersToShow + 1;
  }

  const observationsList = observations
    .slice(
      (currentPageObservations - 1) * itemsPerPage,
      currentPageObservations * itemsPerPage
    )
    .map((observation) => {
      return (
        <div key={observation.id} className="card">
          <img
            className="card-head"
            src={observation.image_url}
            alt={observation.common_name}
          />
          <div className="card-body">
            <div style={{ fontWeight: "bold" }}>{observation.common_name}</div>
            <div className="float-end">{observation.user_name}</div>
            <Link to={`${observation.id}`} className="btn btn-primary btn-sm">
              View Details
            </Link>
            {currentUser &&
              (currentUser.user_role === "admin" ||
                currentUser.user_role === "moderator" ||
                currentUser.user_id === observation.user_id) && (
                <>
                  <button
                    onClick={() => setObservation(observation)}
                    className="btn btn-warning  btn-sm"
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteObservation(observation.id)}
                  >
                    Delete
                  </button>
                </>
              )}
          </div>
        </div>
      );
    });

  // Species
  const [currentPageSpecies, setCurrentPageSpecies] = useState(1);
  const speciesDictionary = {};
  observations.forEach((observation) => {
    if (!speciesDictionary[observation.common_name]) {
      speciesDictionary[observation.common_name] = {
        scientific_name: observation.scientific_name,
        image_urls: [observation.image_url],
        numObservations: 1,
      };
    } else {
      speciesDictionary[observation.common_name].image_urls.push(
        observation.image_url
      );
      speciesDictionary[observation.common_name].numObservations += 1;
    }
  });
  const sortedSpeciesKeys = Object.keys(speciesDictionary).sort((a, b) => {
    return (
      speciesDictionary[b].numObservations -
      speciesDictionary[a].numObservations
    );
  });

  const totalPagesSpecies = Math.ceil(
    Object.keys(speciesDictionary).length / itemsPerPage
  );
  const pageNumbersSpecies = Array.from(
    { length: totalPagesSpecies },
    (_, index) => index + 1
  );
  let startPageSpecies = Math.max(
    1,
    currentPageSpecies - Math.floor(maxPageNumbersToShow / 2)
  );
  let endPageSpecies = Math.min(
    totalPagesSpecies,
    startPageSpecies + maxPageNumbersToShow - 1
  );
  if (endPageSpecies - startPageSpecies + 1 < maxPageNumbersToShow) {
    startPageSpecies = endPageSpecies - maxPageNumbersToShow + 1;
  }

  const speciesCards = sortedSpeciesKeys
    .slice(
      (currentPageSpecies - 1) * itemsPerPage,
      currentPageSpecies * itemsPerPage
    )
    .map((commonName) => (
      <div key={commonName} to={`${commonName}`} className="card">
        <img
          className="card-head"
          src={speciesDictionary[commonName].image_urls[0]}
          alt={commonName}
        />
        <div className="card-body">
          <div style={{ fontWeight: "bold" }}>{commonName}</div>
          <div>
            ({speciesDictionary[commonName].scientific_name}) -{" "}
            {speciesDictionary[commonName].numObservations} observations
          </div>
        </div>
      </div>
    ));

  // Observers
  const observerCounts = {};
  observations.forEach((observation) => {
    const userName = observation.user_name;
    if (userName !== "") {
      observerCounts[userName] = (observerCounts[userName] || 0) + 1;
    }
  });

  const observers = uniqueObservers
    .filter((userName) => userName !== null) // Filter out observers with null user_name
    .map((userName) => ({
      userName,
      observationCount: observerCounts[userName] || 0,
    }));

  observers.sort((a, b) => b.observationCount - a.observationCount);

  const [currentPageObservers, setCurrentPageObservers] = useState(1);
  const totalPagesObservers = Math.ceil(observers.length / itemsPerPage);
  const pageNumbersObservers = Array.from(
    { length: totalPagesObservers },
    (_, index) => index + 1
  );
  let startPageObservers = Math.max(
    1,
    currentPageObservers - Math.floor(maxPageNumbersToShow / 2)
  );
  let endPageObservers = Math.min(
    totalPagesObservers,
    startPageObservers + maxPageNumbersToShow - 1
  );

  const observerList = (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col" style={{ width: "10%" }}>
              Rank
            </th>
            <th scope="col" style={{ width: "70%" }}>
              User
            </th>
            <th scope="col" style={{ width: "10%" }}>
              Observations
            </th>
            <th scope="col" style={{ width: "10%" }}>
              Species
            </th>
          </tr>
        </thead>
        <tbody>
          {observers
            .map((observer, index) => ({
              ...observer,
              rank: index + 1,
              speciesCount: getSpeciesCountForUser(observer.userName),
            }))
            .slice(
              (currentPageObservers - 1) * itemsPerPage,
              currentPageObservers * itemsPerPage
            )
            .map((observer) => (
              <tr key={observer.userName}>
                <th scope="row">{observer.rank}</th>
                <td style={{ fontWeight: "bold" }}>{observer.userName}</td>
                <td>{observer.observationCount}</td>
                <td>{observer.speciesCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  // Function to get species count for the user
  function getSpeciesCountForUser(userName) {
    const speciesSet = new Set();
    observations.forEach((observation) => {
      if (observation.user_name === userName) {
        speciesSet.add(observation.common_name);
      }
    });
    return speciesSet.size;
  }
  observers.sort((a, b) => b.observationCount - a.observationCount);

  const handlePageChangeObservations = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesObservations) {
      setCurrentPageObservations(pageNumber);
    }
  };

  const handlePageChangeSpecies = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesSpecies) {
      setCurrentPageSpecies(pageNumber);
    }
  };

  const handlePageChangeObservers = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesObservers) {
      setCurrentPageObservers(pageNumber);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchObservations();
  }, []);

  return (
    <div>
      <div style={{ width: "100%", height: "70px" }}></div>

      <ul
        className="nav nav-pills mb-3 wd-header"
        id="pills-tab"
        role="tablist"
        style={{ height: "70px" }}
      >
        <li
          className="d-flex align-items-center col"
          style={{ marginLeft: "5%" }}
        >
          The World
        </li>
        <button
          className="custom-nav-link active d-flex align-items-center col-lg-2 border-0"
          id="pills-observation-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-observation"
          type="button"
          role="tab"
          aria-controls="pills-observation"
          aria-selected="true"
        >
          {observations.length} <br />
          OBSERVATIONS
        </button>
        <button
          className="custom-nav-link d-flex align-items-center col-lg-2 border-0"
          id="pills-species-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-species"
          type="button"
          role="tab"
          aria-controls="pills-species"
          aria-selected="false"
        >
          {uniqueSpecies.size} <br />
          SPECIES
        </button>
        <button
          className="custom-nav-link d-flex align-items-center col-lg-2 border-0"
          id="pills-observers-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-observers"
          type="button"
          role="tab"
          aria-controls="pills-observers"
          aria-selected="false"
        >
          {numUniqueObservers.size} <br />
          OBSERVERS
        </button>
      </ul>

      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-observation"
          role="tabpanel"
          aria-labelledby="pills-observation-tab"
        >
          {currentUser && (
            <div className="list-group my-3">
              <div className="list-group-item">
                <div className="mb-3">
                  <label htmlFor="commonName" className="form-label">
                    Common Name:
                  </label>
                  <input
                    id="commonName"
                    className="form-control"
                    placeholder="Common Name"
                    onChange={(e) =>
                      setObservation({
                        ...observation,
                        common_name: e.target.value,
                      })
                    }
                    value={observation.common_name}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    placeholder="Description"
                    onChange={(e) =>
                      setObservation({
                        ...observation,
                        description: e.target.value,
                      })
                    }
                    value={observation.description}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="place_guess" className="form-label">
                    Place:
                  </label>
                  <input
                    id="place_guess"
                    className="form-control"
                    placeholder="Place"
                    onChange={(e) =>
                      setObservation({
                        ...observation,
                        place_guess: e.target.value,
                      })
                    }
                    value={observation.place_guess}
                    type="text"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="species_guess" className="form-label">
                    Species:
                  </label>
                  <input
                    id="species_guess"
                    className="form-control"
                    placeholder="Species"
                    onChange={(e) =>
                      setObservation({
                        ...observation,
                        species_guess: e.target.value,
                      })
                    }
                    value={observation.species_guess}
                    type="text"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="scientific_name" className="form-label">
                    Scientific Name:
                  </label>
                  <input
                    id="scientific_name"
                    className="form-control"
                    placeholder="Scientific Name"
                    onChange={(e) =>
                      setObservation({
                        ...observation,
                        scientific_name: e.target.value,
                      })
                    }
                    value={observation.scientific_name}
                    type="text"
                  />
                </div>
              </div>
              <div className="list-group-item">
                <button
                  onClick={addObservations}
                  className="btn btn-warning mx-1 col-sm"
                >
                  Add
                </button>
                <button
                  onClick={updateObservations}
                  className="btn btn-primary mx-1 col-sm"
                >
                  Update
                </button>
              </div>
            </div>
          )}

          <div className="container my-5">
            <div className="d-flex justify-content-center flex-wrap gap-4">
              {observationsList}
            </div>
          </div>
          <div className="pagination justify-content-center pb-4">
            <button
              onClick={() =>
                handlePageChangeObservations(currentPageObservations - 1)
              }
              disabled={currentPageObservations === 1}
            >
              {"<"}
            </button>
            {pageNumbersObservations
              .slice(startPageObservations - 1, endPageObservations)
              .map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChangeObservations(pageNumber)}
                  className={`${
                    currentPageObservations === pageNumber ? "active" : ""
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            <button
              onClick={() =>
                handlePageChangeObservations(currentPageObservations + 1)
              }
              disabled={currentPageObservations === totalPagesObservations}
            >
              {">"}
            </button>
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="pills-species"
          role="tabpanel"
          aria-labelledby="pills-species-tab"
        >
          <div className="container my-5">
            <div className="d-flex justify-content-center flex-wrap gap-4">
              {speciesCards}
            </div>
          </div>
          <div className="pagination justify-content-center pb-4">
            <button
              onClick={() => handlePageChangeSpecies(currentPageSpecies - 1)}
              disabled={currentPageSpecies === 1}
            >
              {"<"}
            </button>
            {pageNumbersSpecies
              .slice(startPageSpecies - 1, endPageSpecies)
              .map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChangeSpecies(pageNumber)}
                  className={`${
                    currentPageSpecies === pageNumber ? "active" : ""
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            <button
              onClick={() => handlePageChangeSpecies(currentPageSpecies + 1)}
              disabled={currentPageSpecies === totalPagesSpecies}
            >
              {">"}
            </button>
          </div>
        </div>

        {currentUser ? (
          <div
            className="tab-pane fade"
            id="pills-observers"
            role="tabpanel"
            aria-labelledby="pills-observers-tab"
          >
            <div className="container my-5">
              <div className="justify-content-center flex-wrap gap-4">
                {observerList}
              </div>
            </div>
            <div className="pagination justify-content-center pb-4">
              <button
                onClick={() =>
                  handlePageChangeObservers(currentPageObservers - 1)
                }
                disabled={currentPageObservers === 1}
              >
                {"<"}
              </button>
              {pageNumbersObservers
                .slice(startPageObservers - 1, endPageObservers)
                .map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChangeObservers(pageNumber)}
                    className={`${
                      currentPageObservers === pageNumber ? "active" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              <button
                onClick={() =>
                  handlePageChangeObservers(currentPageObservers + 1)
                }
                disabled={currentPageObservers === totalPagesObservers}
              >
                {">"}
              </button>
            </div>
          </div>
        ) : (
          <div
            className="tab-pane fade"
            id="pills-observers"
            role="tabpanel"
            aria-labelledby="pills-observers-tab"
          >
            <div className="container my-5">
              <div className="alert alert-danger">
                Please Login to view this page
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Explore;
