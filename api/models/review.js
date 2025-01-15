
const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    dateTime: { type: Date, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
