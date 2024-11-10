const asyncHandler = require("express-async-handler");
const Progress = require("../models/Progress");

const progressController = {
  createOrUpdateProgress: asyncHandler(async (req, res) => {
    const { scenarioId, choices } = req.body;
    const userId = req.user;

    if (typeof scenarioId !== "number" || typeof choices !== "number") {
      return res
        .status(400)
        .json({ error: "Scenario ID and choices must be numbers" });
    }

    const progress = await Progress.findOneAndUpdate(
      { userId, scenarioId },
      { choices },
      { new: true, upsert: true }
    );

    res.json({ message: "Progress updated successfully", progress });
  }),

  getProgress: asyncHandler(async (req, res) => {
    try {
      const userId = req.user;
      const progress = await Progress.find({ userId }).populate(
        "userId",
        "username email"
      );

      // If no progress is found, return an empty array
      if (!progress.length) {
        return res.json([]); // Return an empty array instead of a 404 status
      }

      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to retrieve progress" });
    }
  }),

  resetProgress: asyncHandler(async (req, res) => {
    const userId = req.user;
    const { scenarioId } = req.body;  // Assume scenarioId is sent in the request body

    if (!userId || typeof scenarioId !== "number") {
      return res.status(400).json({ error: "User ID or scenario ID is missing or invalid" });
    }

    // Find the specific progress document for the user and scenario
    const progress = await Progress.findOne({ userId, scenarioId });

    if (!progress) {
      return res.status(404).json({ message: "No progress found for this scenario" });
      //create/update progress
    }

    // Reset the counter to 0
    progress.counter = 0;
    await progress.save();

    res.json({ message: "Counter reset successfully", progress });
}),

  incrementCounter: asyncHandler(async (req, res) => {
    const { scenarioId } = req.body;
    const userId = req.user;

    // Check if scenarioId is valid
    if (typeof scenarioId !== "number") {
      return res.status(400).json({ error: "Scenario ID must be a number" });
    }

    // Find the progress document
    const progress = await Progress.findOne({ userId, scenarioId });

    if (!progress) {
      return res
        .status(404)
        .json({ message: "No progress found for this scenario" });
    }

    // Check if counter is 0, then increment it
    //if (progress.counter === 0) {
    progress.counter += 1;
    await progress.save();
    return res.json({
      message: "Counter incremented",
      counter: progress.counter,
    }); //}

    res.json({ message: "Counter is not 0, no increment performed" });
  }),
};

module.exports = progressController;
