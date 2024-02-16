import axios from "axios";
// local
// export const BASE_API = "http://localhost:4000";
// export const USERS_API = `${BASE_API}/project/users`;

export const BASE_API = "https://flora-fauna-node-server-app.onrender.com";
export const USERS_API = `${BASE_API}/project/users`;

const request = axios.create({
  withCredentials: true,
});

export const account = async () => {
  try {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const signin = async (credentials) => {
  try {
    console.log("credentials : ", credentials);
    const response = await request.post(`${USERS_API}/signin`, credentials);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (user) => {
  try {
    console.log("IN UPADTE USER : credentials : ", user);
    const response = await request.put(
      `${USERS_API}/${user.user_id}/edit`,
      user
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user) => {
  try {
    const response = await request.post(`${USERS_API}`, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const findUserById = async (id) => {
  try {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (user) => {
  try {
    const response = await request.delete(`${USERS_API}/${user._id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (credentials) => {
  try {
    console.log("inside signup_client");
    const response = await request.post(`${USERS_API}/signup`, credentials);
    console.log("returned to signup client");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signout = async () => {
  try {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
