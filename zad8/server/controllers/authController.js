const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await User.create({ login, password });
        res.status(201).json({ message: "Użytkownik zarejestrowany!", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await User.findOne({ where: { login } });

        if (!user) {
            return res.status(404).json({ error: "Użytkownik nie istnieje." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Nieprawidłowe hasło." });
        }

        const token = jwt.sign({ id: user.id, login: user.login }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Zalogowano pomyślnie!", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
};
