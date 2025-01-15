
const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    rentalDate: { type: Date, required: true },
});

module.exports = mongoose.model("Rental", rentalSchema);
