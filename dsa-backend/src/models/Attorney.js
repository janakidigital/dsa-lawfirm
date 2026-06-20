const mongoose = require("mongoose");

const attorneySchema = new mongoose.Schema({
  name:   { type: String, required: true },
  role:   { type: String, required: true },
  spec:   { type: String, required: true },
  image:  { type: String, default: "" },
  order:  { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Attorney", attorneySchema);