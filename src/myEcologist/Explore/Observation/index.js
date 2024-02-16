import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useParams, Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { React, useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { search } from "../../Header/client";
import { fetchExplore } from "../client";
import * as client from "../client";
import { GoLinkExternal } from "react-icons/go";

function Observation() {
  const { observationId } = useParams();

  const [observation, setObservation] = useState(null);
  const [query, setQuery] = useState("");
  const [followers, setFollowers] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userLikeStatus, setUserLikeStatus] = useState(null);

  //like and dislike
  const [likeStatus, setLikeStatus] = useState(null); // 'like', 'dislike', or null

  const handleLike = async () => {
    setLikeStatus("like");
    manageLikeDislikeByUser(currentUser.user_id, observationId, "true");
  };

  const handleDislike = async () => {
    setLikeStatus("dislike");
    manageLikeDislikeByUser(currentUser.user_id, observationId, "false");
  };

  const fetchLikeDataForObservation = async (user_id, post_id) => {
    try {
      const likeData = await client.getLikeDataForPost(user_id, post_id);
      console.log("HEY NO ERROR");
    } catch (err) {
      console.log(err);
    }
  };

  const manageLikeDislikeByUser = async (user_id, post_id, like) => {
    try {
      const response = await client.manageLikeDislikeForPost(
        user_id,
        post_id,
        like
      );
      console.log("like dislike response ::", response);
      const response2 = getLikeDislikeCountForPost();
      console.log(response2);
    } catch (err) {
      console.log(err);
    }
  };

  const FetchFollowers = async () => {
    const followers = await client.findFollowersByPost(observationId);
    console.log(followers);
    setFollowers(followers);
  };
  const followPost = async () => {
    const status = await client.userFollowPost(observationId);
  };
  const unFollowPost = async () => {
    const status = await client.userUnfollowPost(observationId);
  };

  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const getServerCurrentUser = await client.account();
      setCurrentUser(getServerCurrentUser);
    } catch (err) {
      console.log(err);
    }
  };

  const getLikeDislikeCountForPost = async () => {
    try {
      console.log("getting like count data");
      if (currentUser) {
        const response = await client.getLikeDislikeCountForPost(
          currentUser.user_id,
          observationId
        );
        console.log(response);
        setLikeCount(response.like);
        setDislikeCount(response.dislike);
        setUserLikeStatus(response.userLikeStatus);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Fetch observation data from MongoDB
    fetchExplore(parseInt(observationId, 10)).then((data) => {
      setObservation(data);
      // Use the common_name from MongoDB data for searching
      search(data.common_name).then((results) => setQuery(results));
    });
    fetchCurrentUser();
    FetchFollowers();
  }, [parseInt(observationId, 10)]);

  // Separate useEffect for handling currentUser-dependent actions
  useEffect(() => {
    if (currentUser) {
      console.log("getting like data");
      const response = getLikeDislikeCountForPost();
      console.log(response);
    } else {
      console.log("IN ELSE NO CURRENT USER FOUND");
    }
  }, [currentUser, observationId]);
  // Check if observation is null before rendering
  if (observation === null) {
    return <div>Loading...</div>; // You can show a loading indicator or handle it differently
  }

  const getFormattedTime = () => {
    if (observation.time_observed_at) {
      return observation.time_observed_at.split(" +")[0];
    }
    return "None";
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 col-xl-6">
          <h2>{observation.common_name ? observation.common_name : "None"}</h2>
          <img src={observation.image_url} alt={observation.common_name} />
        </div>

        <div className="col-12 col-xl-6 mt-5">
          {/* when user is logged in */}
          <div>
            {currentUser && (
              <>
                <button
                  onClick={() => unFollowPost()}
                  className="btn btn-warning float-end"
                >
                  Unfollow
                </button>
                <button
                  onClick={() => followPost()}
                  className="btn btn-success float-end me-3"
                >
                  Follow Post
                </button>
                <button
                  className={`btn ${
                    userLikeStatus === true ? "btn-primary" : "btn-light"
                  } me-3 float-end`}
                  onClick={handleLike}
                >
                  <FaThumbsUp /> Like {likeCount}
                </button>
                <button
                  className={`btn ${
                    userLikeStatus === false ? "btn-primary" : "btn-light"
                  } me-3 float-end`}
                  onClick={handleDislike}
                >
                  <FaThumbsDown /> Dislike {dislikeCount}
                </button>
              </>
            )}
          </div>

          <h4 className="d-flex align-items-center gap-3 mb-3">
            {/* Other JSX... */}
          </h4>
          <div>
            <div className="fw-bold">Scientific Name:</div>
            {observation.scientific_name ? observation.scientific_name : "None"}
            <div className="fw-bold">Description:</div>
            {observation.description ? observation.description : "None"}
            <br />
            <Link
              to={`${query.fullurl}`}
              className="link-underline-light link-dark link-underline-opacity-100-hover"
            >
              Wikipedia Page <GoLinkExternal />
            </Link>

            <div dangerouslySetInnerHTML={{ __html: query.extract }}></div>

            <div className="fw-bold">Observed Location:</div>
            {observation.place_guess ? observation.place_guess : "None"}
            <div className="fw-bold">Observed:</div>
            {getFormattedTime()}
            {observation.time_zone}
            <div className="fw-bold">Submitted:</div>
            {observation.created_at.split(" +")[0]
              ? observation.created_at
              : "None"}
          </div>
        </div>
      </div>
      {observation.latitude && observation.longitude && (
        <div className="mt-4">
          <h4 className="mb-3">Observation Location on Map</h4>
          <iframe
            width="100%"
            height="500"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=${observation.latitude},${observation.longitude}`}
          ></iframe>
        </div>
      )}
      <h3>Followers</h3>
      <div className="list-group">
        {followers.map((follows) => (
          <Link
            to={`/community/${follows.follower.user_id}`}
            className="list-group-item list-group-item-action"
            key={follows.follower.user_id}
          >
            {follows.follower.user_name}
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Observation;
