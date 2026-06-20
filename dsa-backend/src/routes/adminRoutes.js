require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Attorney = require("../models/Attorney");
const PracticeArea = require("../models/PracticeArea");
const Inquiry = require("../models/Inquiry");
const requireAdmin = require("../middleware/auth");

const router = express.Router();

// ── LOGIN ──────────────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username and password required." });

    const admin = await Admin.findOne({ username });
    if (!admin)
      return res.status(401).json({ message: "Invalid credentials." });

    const match = await admin.comparePassword(password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, admin: { username: admin.username } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed." });
  }
});

// ── SEED ───────────────────────────────────────────────────────────────────
router.post("/seed", async (req, res) => {
  try {
    const exists = await Admin.findOne({});
    if (exists) return res.status(400).json({ message: "Admin already exists." });
    await Admin.create({
      username: process.env.ADMIN_USERNAME || "dsaadmin",
      password: process.env.ADMIN_PASSWORD || "dsa@admin123",
    });
    res.json({ message: "Admin created successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── VERIFY ─────────────────────────────────────────────────────────────────
router.get("/verify", requireAdmin, (req, res) => {
  res.json({ ok: true, admin: req.admin });
});

// ── ATTORNEYS ──────────────────────────────────────────────────────────────
router.get("/attorneys", requireAdmin, async (req, res) => {
  const data = await Attorney.find().sort({ order: 1 });
  res.json({ data });
});
const upload = require("../middleware/upload");

// POST /attorneys
router.post("/attorneys", requireAdmin, upload.single("image"), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.image = "/uploads/" + req.file.filename;
    const doc = await Attorney.create(body);
    res.status(201).json({ data: doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /attorneys/:id
router.put("/attorneys/:id", requireAdmin, upload.single("image"), async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.image = "/uploads/" + req.file.filename;
    const doc = await Attorney.findByIdAndUpdate(req.params.id, body, { new: true });
    res.json({ data: doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/attorneys/:id", requireAdmin, async (req, res) => {
  await Attorney.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ── PRACTICE AREAS ─────────────────────────────────────────────────────────
router.get("/practice-areas", requireAdmin, async (req, res) => {
  const data = await PracticeArea.find().sort({ order: 1 });
  res.json({ data });
});
router.post("/practice-areas", requireAdmin, async (req, res) => {
  try {
    const doc = await PracticeArea.create(req.body);
    res.status(201).json({ data: doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put("/practice-areas/:id", requireAdmin, async (req, res) => {
  try {
    const doc = await PracticeArea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ data: doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/practice-areas/:id", requireAdmin, async (req, res) => {
  await PracticeArea.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ── INQUIRIES ──────────────────────────────────────────────────────────────
router.get("/inquiries", requireAdmin, async (req, res) => {
  const data = await Inquiry.find().sort({ createdAt: -1 });
  res.json({ data });
});
router.put("/inquiries/:id", requireAdmin, async (req, res) => {
  try {
    const doc = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ data: doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/inquiries/:id", requireAdmin, async (req, res) => {
  await Inquiry.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ── CHANGE PASSWORD ────────────────────────────────────────────────────────
router.put("/password", requireAdmin, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id);
    const match = await admin.comparePassword(currentPassword);
    if (!match) return res.status(401).json({ message: "Current password is incorrect." });
    admin.password = newPassword;
    await admin.save();
    res.json({ message: "Password updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// ── SEED EXISTING DATA ─────────────────────────────────────────────────────
router.get("/seed-data", async (req, res) => {
  try {
    // Seed Attorneys
    const attorneyCount = await Attorney.countDocuments();
    if (attorneyCount === 0) {
      await Attorney.insertMany([
        { name: "Rajesh Sharma", role: "Senior Partner", spec: "Corporate Law · M&A · 20 Years", order: 1, active: true },
        { name: "Priya Verma", role: "Managing Partner", spec: "IP Law · Compliance · 16 Years", order: 2, active: true },
        { name: "Arjun Kapoor", role: "Associate Partner", spec: "Litigation · Employment Law · 12 Years", order: 3, active: true },
      ]);
    }

    // Seed Practice Areas
    const practiceCount = await PracticeArea.countDocuments();
    if (practiceCount === 0) {
      await PracticeArea.insertMany([
        { num: "01", name: "Corporate Law", desc: "Full-spectrum corporate legal services — governance, structure, bylaws, shareholder agreements, and board advisory.", icon: "landmark", order: 1, active: true },
        { num: "02", name: "Mergers & Acquisitions", desc: "Expert M&A counsel from due diligence and deal structuring through negotiation, documentation, and seamless closing.", icon: "handshake", order: 2, active: true },
        { num: "03", name: "Intellectual Property", desc: "Protect your innovations — trademark registration, patent filings, copyright enforcement, and IP litigation support.", icon: "lightbulb", order: 3, active: true },
        { num: "04", name: "Compliance & Regulatory", desc: "Navigating complex regulatory frameworks — securities law, financial compliance, and government regulatory affairs.", icon: "clipboard", order: 4, active: true },
        { num: "05", name: "Corporate Litigation", desc: "Aggressive, strategic courtroom representation for commercial disputes, contract breaches, and corporate conflicts.", icon: "swords", order: 5, active: true },
        { num: "06", name: "Employment Law", desc: "HR compliance, employment contracts, workplace investigations, and executive compensation structuring.", icon: "users", order: 6, active: true },
      ]);
    }

    res.json({ success: true, message: "Data seeded successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});