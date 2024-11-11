const express = require("express");
const userRouter = express.Router();
const usersController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuth");
userRouter.post("/api/v1/signup", usersController.Signup);
userRouter.post("/api/v1/login", usersController.login);
userRouter.get(
  "/api/v1/dashboard",
  isAuthenticated,
  usersController.dashboard
);
userRouter.put(
  "/api/v1/changePass",
  isAuthenticated,
  usersController.changeUserPassword
);
userRouter.put(
  "/api/v1/users/update-profile",
  isAuthenticated,
  usersController.updateProfile
);
module.exports = userRouter;