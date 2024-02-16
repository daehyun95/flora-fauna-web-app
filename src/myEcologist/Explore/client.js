import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

// const USER_URL = "http://localhost:4000/project/users";
// const EXPLORE_URL = "http://localhost:4000/project/explore";
// const FOLLOW_URL = "http://localhost:4000/project";

const USER_URL =
  "https://flora-fauna-node-server-app.onrender.com/project/users";
const EXPLORE_URL =
  "https://flora-fauna-node-server-app.onrender.com/project/explore";
const FOLLOW_URL = "https://flora-fauna-node-server-app.onrender.com/project";

export const fetchExplores = async () => {
  const response = await request.get(`${EXPLORE_URL}`);
  return response.data;
};

export const fetchExplore = async (id) => {
  const response = await request.get(`${EXPLORE_URL}/${id}`);
  console.log(response.data);
  return response.data;
};

export const addNewExplore = async (explore) => {
  const response = await request.post(`${EXPLORE_URL}`, explore);
  return response.data;
};

export const deleteExplore = async (id) => {
  const response = await request.delete(`${EXPLORE_URL}/${id}`);
  return response.data;
};

export const updateExplore = async (explore) => {
  const response = await request.put(`${EXPLORE_URL}/${explore.id}`, explore);
  return response.data;
};

export const createExplore = async (explore) => {
  const response = await request.post(`${EXPLORE_URL}`, explore);
  return response.data;
};

export const userFollowPost = async (postid) => {
  const response = await request.post(`${FOLLOW_URL}/follows/${postid}`);
  return response.data;
};

export const userUnfollowPost = async (postid) => {
  const response = await request.delete(`${FOLLOW_URL}/unfollows/${postid}`);
  return response.data;
};

export const findFollowersByPost = async (postid) => {
  const response = await request.get(`${FOLLOW_URL}/followers/${postid}`);
  return response.data;
};

export const account = async () => {
  const response = await request.post(`${USER_URL}/account`);
  return response.data;
};

export const getLikeDataForPost = async (post_id) => {
  console.log(`${EXPLORE_URL}/${post_id}/likedislike`);
  const response = await request.get(`${EXPLORE_URL}/${post_id}/likedislike`);
  return response.data;
};

export const manageLikeDislikeForPost = async (user_id, post_id, like) => {
  const response = await request.post(
    `${EXPLORE_URL}/${post_id}/likedislike/${user_id}/${like}`
  );
  return response.data;
};

export const getLikeDislikeCountForPost = async (user_id, post_id) => {
  const response = await request.get(
    `${EXPLORE_URL}/${post_id}/likedislike/${user_id}/count`
  );
  return response.data;
};
