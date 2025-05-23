import React, { useState } from "react";
import "../App.css";

const LLM = () => {
    const [prompt, setPrompt] = useState("");
    const [promptsNumber, setPromptsNumber] = useState(0);

    const openings = ["Could you help me?", "Hello!", "May I have a question about clothes?", "I have a question about fashion for you.", "I would like to talk with you."];
    const closings = ["Thank you very much!", "Thanks, this is what I wanted to know!", "Great!", "You've really helped me!", "Goodbye!"];

    const getResponse = async (e) => {
        e.preventDefault();
        try {
            document.getElementById("conversation").innerHTML += `<div class="author">${prompt}</div>`;
            setPromptsNumber(prev => prev + 1);
            setPrompt("");
            const response = await fetch("http://localhost:8000/llm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({prompt}),
            });

            if (!response.ok) {
                throw new Error("Błąd przy uzyskiwaniu odpowiedzi z LLM.");
            }
            const data = await response.json();
            document.getElementById("conversation").innerHTML += `<div class="model">${data.response}</div>`;
        }
        catch (error){
            console.log(error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Porozmawiaj z naszą AI!</h2>
            <div id="conversation">
            </div>
            <form onSubmit={getResponse}>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} required></textarea>
                <div className="mt-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Wyślij
                    </button>
                </div>
            </form>
            {promptsNumber === 0 && (
                <div className="mt-6">
                    {openings.map((line, index) => (
                        <button key={index} onClick={() => setPrompt(line)}>{line}</button>
                    ))}
                </div>
            )}
            {promptsNumber > 0 && (
                <div className="mt-6">
                    {closings.map((line, index) => (
                        <button key={index} onClick={() => setPrompt(line)}>{line}</button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LLM;