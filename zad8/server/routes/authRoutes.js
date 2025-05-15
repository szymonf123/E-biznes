const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    register,
    login,
    googleLogin,
    googleCallback,
} = require("../controllers/authController");

router.get("/login", (req, res) => {
    res.status(200).send("Endpoint logowania działa poprawnie!");
});

router.post("/register", register);
router.post("/login", login);
router.get("/google", googleLogin);
router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);

module.exports = router;
