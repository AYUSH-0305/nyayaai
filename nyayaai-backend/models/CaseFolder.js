const mongoose = require("mongoose");

const caseFolderSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  documents: [String],
});

module.exports = mongoose.model("CaseFolder", caseFolderSchema);
