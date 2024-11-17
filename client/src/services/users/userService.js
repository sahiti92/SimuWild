import { BASE_URL } from "../../utils/url";
import axios from "axios";
import second from "axios";
import { getUserFromStorage } from "../../utils/getUser";
//! Get the token
const token = getUserFromStorage();
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
};
export const registerAPI = async (userData) => {
  console.log('Sending data to API:', userData); // Log the user data
  const response = await axios.post(`${BASE_URL}/signup`, userData);
  console.log('API response:', response.data); // Log the response
  return response.data;
};

export const dashboardAPI = async ({ email, password, username }) => {
  const response = await axios.post(`${BASE_URL}/dashboard`, {
    email,
    password,
    username,
  });
  return response.data;
};
export const changePasswordAPI = async (newPassword) => {
  const response = await axios.put(
    `${BASE_URL}/users/change-password`,
    {
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("tried");
  return response.data;
};
export const updateProfileAPI = async ({ email, username }) => {
  const response = await axios.put(
    `${BASE_URL}/users/update-profile`,
    {
      email,
      username,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};