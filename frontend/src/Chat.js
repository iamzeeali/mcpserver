import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

const Chat = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm your AI assistant. How can I help you today?",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [selectedTool, setSelectedTool] = useState("default");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() === "") return;

        const userMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages([...messages, userMessage]);
        setInputValue("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3001/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: inputValue,
                    selectedTool: selectedTool,
                }),
            });

            const data = await response.json();

            const botMessage = {
                id: messages.length + 2,
                text: data.answer || data.response || "Sorry, I couldn't process your request.",
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = {
                id: messages.length + 2,
                text: "Error connecting to the server. Please try again.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1 className="chat-title">AI Assistant</h1>
                <p className="chat-subtitle">Powered by OpenAI</p>
            </div>

            <div className="chat-messages">
                {messages.map((message) => (
                    <div key={message.id} className={`message-group ${message.sender}`}>
                        <div className={`message message-${message.sender}`}>
                            <div className="message-content">{message.text}</div>
                            <div className="message-time">
                                {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="message-group bot">
                        <div className="message message-bot">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-section">
                <div className="tool-selector mb-3">
                    <label htmlFor="toolSelect" className="form-label">
                        Select Tool:
                    </label>
                    <select
                        id="toolSelect"
                        className="form-select form-select-sm w-auto"
                        value={selectedTool}
                        onChange={(e) => setSelectedTool(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="search">Search</option>
                        <option value="summarize">Summarize</option>
                        <option value="explainLikeKid">Explain Like I'm a Kid</option>
                        <option value="weather">Weather</option>
                    </select>
                </div>

                <div className="input-group">
                    <textarea
                        className="form-control chat-input"
                        placeholder="Ask anything..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        rows="3"
                        disabled={loading}
                    />
                    <button
                        className="btn btn-primary send-button"
                        onClick={handleSendMessage}
                        disabled={loading || inputValue.trim() === ""}
                    >
                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                Sending...
                            </>
                        ) : (
                            "Send"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
