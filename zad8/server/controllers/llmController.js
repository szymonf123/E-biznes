async function checkPromptWithFilter(prompt){
    try {
        const response = await fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        });
        return await response.json();
    }
    catch (error){
        console.error('Błąd połączenia z filtrem:', error.message);
        throw new Error('Filter service unavailable.');
    }
}

async function sendPrompt(prompt, model = "orca-mini") {
    const filterCheck = await checkPromptWithFilter(prompt);
    if (!filterCheck.allowed) {
        return filterCheck.reason || "Prompt rejected by filter.";
    }
    try {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                prompt: prompt
            })
        });

        if (!response.ok || !response.body) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let output = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(Boolean);

            for (const line of lines) {
                try {
                    const parsed = JSON.parse(line);
                    if (parsed.response) {
                        output += parsed.response;
                    }
                } catch (e) {
                    console.error('Nie można sparsować linii:', line);
                }
            }
        }

        return output;

    } catch (err) {
        console.error('Błąd podczas komunikacji z LLM:', err.message);
        throw err;
    }
}

module.exports = {sendPrompt};
