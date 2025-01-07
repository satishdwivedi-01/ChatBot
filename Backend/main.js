import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

const app = express();
dotenv.config();

const apiKey = process.env.GOOGLE_AI_STUDIO_KEY; 

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message; 

  try {
    
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: "post",
      data: {
        contents: [
          {
            parts: [
              {
                text: userMessage, 
              },
            ],
          },
        ],
      },
    });

    
    const botReply = response.data.candidates[0].content.parts[0].text;
    res.send({ reply: botReply });
  } catch (error) {
    console.error(
      "API error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ reply: "Error communicating with the bot." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
