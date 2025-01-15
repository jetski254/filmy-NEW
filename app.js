require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const authRoutes = require("./api/router/auth");
const movieRoutes = require("./api/router/movies");
const rentalRoutes = require("./api/router/rentals");
const reviewRoutes = require("./api/router/reviews");
const userRoutes = require("./api/router/users");

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oembf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Połączono z bazą danych"))
    .catch((err) => console.log("Błąd połączenia z bazą danych:", err));

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/rentals", rentalRoutes);
app.use("/reviews", reviewRoutes); 
app.use("/users", userRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});

module.exports = app;
