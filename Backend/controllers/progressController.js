const asyncHandler = require("express-async-handler");
const Progress = require("../models/Progress");

const progressController = {
  createOrUpdateProgress: asyncHandler(async (req, res) => {
    const { scenarioId, choices } = req.body;
    const userId = req.user._id;

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
    const userId = req.user._id;
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
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }
    await Progress.deleteMany({ userId });
    res.json({ message: "All progress reset successfully" });
  }),
};

module.exports = progressController;
