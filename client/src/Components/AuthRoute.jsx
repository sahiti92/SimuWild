import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../utils/getUser";

const AuthRoute = ({ children }) => {
  //get the token
  const token = getUserFromStorage();
  console.log(token);
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthRoute;
