async function summarizeTool(text, openai) {
    const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "Convert this into a tweet (max 10 words, catchy)"
            },
            {
                role: "user",
                content: text
            }
        ]
    });

    return res.choices[0].message.content;
}

module.exports = { summarizeTool };