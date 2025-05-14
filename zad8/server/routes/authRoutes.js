const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.get("/login", (req, res) => {
    res.status(200).send("Endpoint logowania działa poprawnie!");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
