require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./src/config/db");
const { verifyEmailConnection } = require("./src/config/email");
const inquiryRoutes = require("./src/routes/inquiryRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const { errorHandler, notFound } = require("./src/middleware/errorHandler");
const { apiLimiter } = require("./src/middleware/rateLimiter");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
verifyEmailConnection();

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", apiLimiter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DSA Corporate Solutions API is running 🚀",
    version: "1.0.0",
    endpoints: {
      inquiries: "/api/inquiries",
      admin: "/api/admin",
    },
  });
});
const Attorney = require("./src/models/Attorney");
const PracticeArea = require("./src/models/PracticeArea");

app.get("/api/attorneys", async (req, res) => {
  const data = await Attorney.find({ active: true }).sort({ order: 1 });
  res.json({ data });
});

app.get("/api/practice-areas", async (req, res) => {
  const data = await PracticeArea.find({ active: true }).sort({ order: 1 });
  res.json({ data });
});


app.use("/api/inquiries", inquiryRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🚀 DSA Backend running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV}`);
  console.log(`📡 API: http://localhost:${PORT}/api/inquiries\n`);
});