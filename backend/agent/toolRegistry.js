const { searchTool } = require("../tools/search");
const { summarizeTool } = require("../tools/summarize");

const tools = [
    {
        type: "function",
        function: {
            name: "search_docs",
            description: "Search knowledge base",
            parameters: {
                type: "object",
                properties: {
                    query: { type: "string" }
                },
                required: ["query"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "summarize_text",
            description: "Summarize text",
            parameters: {
                type: "object",
                properties: {
                    text: { type: "string" }
                },
                required: ["text"]
            }
        }
    }
];

const toolMap = {
    search_docs: searchTool,
    summarize_text: summarizeTool
};

module.exports = { tools, toolMap };