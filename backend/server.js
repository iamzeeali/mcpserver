require('dotenv').config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const { ingest } = require("./rag/ingest");

const { runAgent } = require("./agent/agent");
ingest();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
    const { message, selectedTool } = req.body;

    try {
        const answer = await runAgent(message, selectedTool, openai);
        res.json({ answer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => console.log("Backend running on 3001"));