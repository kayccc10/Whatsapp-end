const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// PORT Railway gives your app
const PORT = process.env.PORT || 3000;

/**
 * 1️⃣ Home route (for testing)
 */
app.get("/", (req, res) => {
  res.send("WhatsApp Webhook is running ✅");
});

/**
 * 2️⃣ WEBHOOK VERIFICATION (CALLBACK URL)
 * This is what Meta uses to verify you
 */
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("Webhook verification request received:", req.query);

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

/**
 * 3️⃣ RECEIVE MESSAGES FROM WHATSAPP
 */
app.post("/webhook", (req, res) => {
  console.log("Incoming WhatsApp message:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
