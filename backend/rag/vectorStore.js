let store = [];

// Add document with embedding
function addDoc(text, embedding) {
    store.push({ text, embedding });
}

// Cosine similarity
function cosineSim(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i] * b[i];
    }
    return sum;
}

// Search top matches
function search(queryEmbedding) {
    return store
        .map(doc => ({
            text: doc.text,
            score: cosineSim(queryEmbedding, doc.embedding)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 1);
}

module.exports = { addDoc, search };