const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).send({ message: "Missing 'message' in request body." });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are Sunny, a witty, slightly sarcastic, but caring and sweet real estate ninja assistant trained by Chris Sanford. Respond like a smart pro with confidence and clarity."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 10000
      }
    );

    const reply = response.data.choices[0].message.content;
    res.send({ message: reply });

  } catch (error) {
    console.error("❌ OpenAI API Error:", error.response?.data || error.message);
    res.status(500).send({
      message: "Sunny ran into a wall. Try again in a sec or check the server logs."
    });
  }
});

app.get("/", (req, res) => {
  res.send("Sunny is running. Send a POST to this URL with a message to chat.");
});

app.listen(3000, () => {
  console.log("✅ Sunny is live on port 3000");
});
const express = require("express");
const app = express();
app.use(express.json()); // Allows reading JSON from Tidio

// SUNNY ENDPOINT
app.post("/sunny", async (req, res) => {
  const userMessage = req.body.message || "Hi";

  const sunnyReply = "Hey! I’m Sunny. Ask me anything about local homes, schools, or neighborhoods.";

  res.status(200).json({
    message: sunnyReply // <- Tidio needs this exact key
  });
});

// Root path (optional check)
app.get("/", (req, res) => {
  res.send("Sunny Concierge API is live");
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunny AI running on port ${PORT}`);
});
