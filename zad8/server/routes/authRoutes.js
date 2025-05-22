const express = require("express");
const passport = require("passport");
const {
    register,
    login,
    googleLogin,
    googleCallback,
    githubLogin,
    githubCallback
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/google", googleLogin);
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), googleCallback);

router.get("/github", githubLogin);
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/" }), githubCallback);

module.exports = router;

