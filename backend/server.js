// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => res.json({ ok: true }));

// POST /api/contact
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message, honeypot } = req.body;

    // Honeypot spam check
    if (honeypot) return res.status(400).json({ error: "spam detected" });

    // Basic server-side validation
    if (!name || !email || !message)
      return res.status(400).json({ error: "Missing required fields" });

    // Create transporter using SMTP from env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailBody = `New contact form submission

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Message:
${message}
`;

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      subject: `Contact form: ${name}`,
      text: mailBody,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Contactly backend listening on ${PORT}`));
