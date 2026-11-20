import "dotenv/config";
import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-haiku-5-5";
const PORT = 3001;

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env
const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: req.body.messages,
    });
    const block = message.content[0];
    res.json({ reply: block.type === "text" ? block.text : "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
