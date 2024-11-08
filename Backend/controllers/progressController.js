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
    const userId = req.user;
    const progress = await Progress.find({ userId }).populate(
      "userId",
      "username email"
    );

    if (!progress.length) {
      return res.status(404).json({ message: "No progress found" });
    }

    res.json(progress);
  }),

  resetProgress: asyncHandler(async (req, res) => {
    const userId = req.user;

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }
    await Progress.deleteMany({ userId });
    res.json({ message: "All progress reset successfully" });
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
      });   //}

    res.json({ message: "Counter is not 0, no increment performed" });
  }),
};

module.exports = progressController;
