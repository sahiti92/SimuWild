const express = require("express");
const router = express.Router();
const progressControllers = require("../controllers/progressController");
const isAuthenticated = require("../middlewares/isAuth");

// Get progress
router.get("/", isAuthenticated, progressControllers.getProgress);

// Update or create progress
router.post(
  "/update",
  isAuthenticated,
  progressControllers.createOrUpdateProgress
); // Updated path

// Reset progress
router.delete("/reset", isAuthenticated, progressControllers.resetProgress);

router.post(
  "/increment-counter",
  isAuthenticated,
  progressControllers.incrementCounter
);
module.exports = router;
