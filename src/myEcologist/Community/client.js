import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

// const USER_URL = "http://localhost:4000/project/users";
// const FOLLOW_URL = "http://localhost:4000/project";

const USER_URL =
  "https://flora-fauna-node-server-app.onrender.com/project/users";
const FOLLOW_URL = "https://flora-fauna-node-server-app.onrender.com/project";
const FOLLOW_USER_URL =
  "https://flora-fauna-node-server-app.onrender.com/follow/users";

export const fetchUsers = async () => {
  const response = await request.get(`${USER_URL}`);
  // console.log(response.data);
  return response.data;
};
export const fetchUser = async (id) => {
  const response = await request.get(`${USER_URL}/${id}`);
  return response.data;
};
export const addNewUser = async (user) => {
  const response = await request.post(`${USER_URL}`, user);
  return response.data;
};
export const deleteUser = async (id) => {
  const response = await request.delete(`${USER_URL}/${id}`);
  return response.data;
};
export const updateUser = async (id, user) => {
  const response = await request.put(`${USER_URL}/${id}`, user);
  return response.data;
};

export const account = async () => {
  const response = await request.post(`${USER_URL}/account`);
  return response.data;
};

export const findPostThatUserFollows = async (id) => {
  const response = await request.get(`${FOLLOW_URL}/following/${id}`);
  return response.data;
};

export const userFollowUser = async (id) => {
  const response = await request.post(`${FOLLOW_USER_URL}/follow/${id}`);
  return response.data;
};

export const userUnfollowUser = async (id) => {
  const response = await request.delete(`${FOLLOW_USER_URL}/unfollow/${id}`);
  return response.data;
};

export const findUsersThatFollowUser = async (id) => {
  const response = await request.get(`${FOLLOW_USER_URL}/followed/${id}`);
  return response.data;
};

export const findUsersThatUserFollows = async (id) => {
  const response = await request.get(`${FOLLOW_USER_URL}/following/${id}`);
  return response.data;
};
