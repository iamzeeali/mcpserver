const docs = require("../data/docs.json");
const { getEmbedding } = require("./embed");
const { addDoc } = require("./vectorStore");

async function ingest() {
    for (let doc of docs) {
        const embedding = await getEmbedding(doc.text);
        addDoc(doc.text, embedding);
    }
    console.log("Data ingested");
}

module.exports = { ingest };