const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ScenarioId: { type: Number, default: 0 },
  choices: { type: Number, default: 0 },
});

module.exports = mongoose.model("Progress", progressSchema);
