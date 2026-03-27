const { searchTool } = require("../tools/search");
const { summarizeTool } = require("../tools/summarize");
const { explainLikeKid } = require("../tools/explainLikeKid");
const { weatherTool } = require("../tools/weather");

async function runAgent(query, selectedTool, openai) {
    let toolResult = "";

    // 🧠 No tool → pure AI
    if (!selectedTool) {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Answer normally" },
                { role: "user", content: query }
            ]
        });

        return response.choices[0].message.content;
    }

    // 🔒 Tool execution
    if (selectedTool === "summarize") {
        toolResult = await summarizeTool(query, openai);
    } else if (selectedTool === "explain") {
        // 🔥 STEP 1: Get real data
        const searchResult = await searchTool({ query });

        // 🔥 STEP 2: Explain that data
        toolResult = await explainLikeKid(searchResult, openai);
    } else if (selectedTool === "weather") {
        toolResult = await weatherTool({ city: query });
    } else {
        toolResult = await searchTool({ query });
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
  Answer ONLY using the provided tool result.
  Do NOT add extra information.
  Do NOT mention anything not in the tool result.
  `
            },
            { role: "user", content: query },
            { role: "assistant", content: toolResult }
        ]
    });

    return response.choices[0].message.content;
}

module.exports = { runAgent };