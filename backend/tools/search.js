const { getEmbedding } = require("../rag/embed");
const { search } = require("../rag/vectorStore");

async function searchTool({ query }) {
    const embedding = await getEmbedding(query);
    const results = search(embedding);

    // 🔥 only return best match
    return results[0]?.text || "No relevant data found";
}

module.exports = { searchTool };