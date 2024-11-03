const express = require("express");
const router = express.Router();
const progressControllers = require("../controllers/progressController");
const isAuthenticated = require("../middlewares/isAuth"); // Middleware for authentication

// Get progress
router.get("/", isAuthenticated, progressControllers.getProgress); // Ensure user is authenticated

// Update progress
router.post(
  "/update",

  progressControllers.createOrUpdateProgress
); // Updated to match the controller method

// Reset progress
router.delete("/reset", isAuthenticated, progressControllers.resetProgress);

module.exports = router;
