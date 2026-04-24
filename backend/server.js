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
        console.error("zeeshansk-proj-Ms-iFTLyhyabITOncR6P64jjt52rCYNE6usV5ozyNORaBS2hU0SeXgdzXF6L2VRLxqaZC1348XT3BlbkFJyt_byTHZs_gAzY9vhm_whtO-Ag8kYmk410sU-k2yuwwZIiwXIRqXi_d7t6gcjuIohRzBZCJ78A" +
            "zeeshana456804d39d0c7dfcbeb71f569f9c66d", err);
    }
});

app.listen(3001, () => console.log("Backend running on 3001"));