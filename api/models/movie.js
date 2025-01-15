const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    genre: String,
    releaseYear: Number,
});

module.exports = mongoose.model("Movie", movieSchema);
