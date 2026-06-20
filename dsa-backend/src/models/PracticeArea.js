const mongoose = require("mongoose");

const practiceAreaSchema = new mongoose.Schema({
  num:    { type: String },
  name:   { type: String, required: true },
  desc:   { type: String, required: true },
  icon:   { type: String, default: "scale" },
  order:  { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("PracticeArea", practiceAreaSchema);