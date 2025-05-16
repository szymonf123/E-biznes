require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(session({
    secret: process.env.SESSION_SECRET || "super_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(express.json());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.status(200).send("Serwer uruchomiony");
})

module.exports = app;