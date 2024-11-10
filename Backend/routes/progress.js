const express = require("express");
const router = express.Router();
const progressControllers = require("../controllers/progressController");
const isAuthenticated = require("../middlewares/isAuth");

router.get("/", isAuthenticated, progressControllers.getProgress);

router.post(
  "/update",
  isAuthenticated,
  progressControllers.createOrUpdateProgress
);

router.post("/reset", isAuthenticated, progressControllers.resetProgress);

router.post(
  "/increment-counter",
  isAuthenticated,
  progressControllers.incrementCounter
);
module.exports = router;
