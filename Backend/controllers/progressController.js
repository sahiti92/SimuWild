const asyncHandler = require("express-async-handler");
const Progress = require("../models/Progress"); // Adjust the path if necessary

const progressController = {
  createOrUpdateProgress: asyncHandler(async (req, res) => {
    const { scenarioId, choices } = req.body;
    const userId = req.user._id; // Assuming req.user is set by authentication middleware

    if (typeof scenarioId !== "number" || typeof choices !== "number") {
      throw new Error("Scenario ID and choices must be numbers");
    }

    const progress = await Progress.findOneAndUpdate(
      { userId, scenarioId },
      { choices },
      { new: true, upsert: true } // Create if it doesn't exist
    );

    res.json({ message: "Progress updated successfully", progress });
  }),

  getProgress: asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming req.user is set by authentication middleware
    const progress = await Progress.find({ userId }).populate(
      "userId",
      "username email"
    );

    if (!progress.length) {
      return res.status(404).json({ message: "No progress found" });
    }

    res.json(progress);
  }),

  deleteProgress: asyncHandler(async (req, res) => {
    const { scenarioId } = req.params;
    const userId = req.user._id; // Assuming req.user is set by authentication middleware

    const deletedProgress = await Progress.findOneAndDelete({
      userId,
      scenarioId,
    });

    if (!deletedProgress) {
      return res.status(404).json({ message: "No progress found to delete" });
    }

    res.json({ message: "Progress deleted successfully", deletedProgress });
  }),

  resetProgress: asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming req.user is set by authentication middleware

    await Progress.deleteMany({ userId });

    res.json({ message: "All progress reset successfully" });
  }),
};

module.exports = progressController;
