const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  scenarioId: { type: Number, required: true },
  choices: { type: Number, required: true },
  counter: { type: Number, default: 0, required: false },
});

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
