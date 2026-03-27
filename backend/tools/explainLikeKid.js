async function explainLikeKid(text, openai) {
    const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "Explain like a 5-year-old using simple words"
            },
            { role: "user", content: text }
        ]
    });

    return res.choices[0].message.content;
}

module.exports = { explainLikeKid };