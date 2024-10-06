const express = require("express");
const userRouter = express.Router();
const usersController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuth");
userRouter.post("/api/v1/users/signup", usersController.Signup);
userRouter.post("/api/v1/users/login", usersController.login);
userRouter.get(
  "/api/v1/users/profile",
  isAuthenticated,
  usersController.profile
);
userRouter.put(
  "/api/v1/users/change-password",
  isAuthenticated,
  usersController.changeUserPassword
);
userRouter.put(
  "/api/v1/users/update-profile",
  isAuthenticated,
  usersController.updateProfile
);
module.exports = userRouter;