const express = require("express");
const {sendPrompt} = require("../controllers/llmController");

const router = express.Router();
router.post('/', async (req, res) => {
    const { prompt, model } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        const output = await sendPrompt(prompt, model || 'orca-mini');
        res.json({ response: output });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to query LLM.' , details: err.message});
    }
});

module.exports = router;