const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./usersdata.sqlite",
    logging: console.log,
});

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Połączono z bazą danych SQLite.");
    } catch (error) {
        console.error("Błąd podczas łączenia z bazą danych:", error.message);
    }
};

initializeDatabase();

module.exports = sequelize;


