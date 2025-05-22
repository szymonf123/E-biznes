import React, { useState } from "react";
import "../App.css";

const LLM = () => {
    const [prompt, setPrompt] = useState("");
    const getResponse = async (e) => {
        e.preventDefault();
        try {
            document.getElementById("conversation").innerHTML += `<div class="author">${prompt}</div>`;
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
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Wyślij
                    </button>
                </div>
            </form>

        </div>
);
};

export default LLM;