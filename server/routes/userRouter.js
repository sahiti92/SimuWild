const express = require("express");
const userRouter = express.Router();
const usersController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuth");
<<<<<<< HEAD:Backend/routes/userRouter.js
userRouter.post("/api/v1/signup", usersController.Signup);
userRouter.post("/api/v1/login", usersController.login);
userRouter.get("/api/v1/dashboard", isAuthenticated, usersController.dashboard);
=======
userRouter.post("/signup", usersController.Signup);
userRouter.post("/login", usersController.login);
userRouter.get(
  "/api/v1/dashboard",
  isAuthenticated,
  usersController.dashboard
);
>>>>>>> d68fc403321c4b448b6fbe5911efdcb963786e8a:server/routes/userRouter.js
userRouter.put(
  "/changePass",
  isAuthenticated,
  usersController.changeUserPassword
);
userRouter.put(
  "/api/v1/users/update-profile",
  isAuthenticated,
  usersController.updateProfile
);
module.exports = userRouter;
