const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const User = require("../models/user");

require("dotenv").config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8000/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({
                    where: { googleId: profile.id },
                });

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = await User.create({
                    login: profile.displayName,
                    googleId: profile.id,
                });

                done(null, newUser);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/auth/github/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { githubId: profile.id } });

        if (!user) {
            user = await User.create({
                githubId: profile.id,
                login: profile.username,
                email: profile.emails?.[0]?.value || null,
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
