const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Make sure uploads folder exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});