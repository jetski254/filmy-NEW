const Review = require("../models/review");
const User = require("../models/user");

exports.addReview = (req, res) => {
    const { user, movie, rating, comment, dateTime } = req.body;

    const review = new Review({
        user,
        movie,
        rating,
        comment,
        dateTime: new Date(dateTime),
    });

    review.save()
        .then((result) => res.status(201).json(result))
        .catch((err) => res.status(500).json({ message: err.message }));
};

exports.getReviewsByUser = (req, res) => {
    const { userId } = req.params;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                throw new Error("Użytkownik nie znaleziony");
            }

            return Review.find({ user: userId }).populate("movie");
        })
        .then((reviews) => {
            if (reviews.length === 0) {
                return res.status(404).json({ message: "Brak opinii dla tego użytkownika" });
            }

            const reviewData = reviews.map((review) => ({
                rating: review.rating,
                comment: review.comment,
                dateTime: review.dateTime,
                movie: {
                    title: review.movie.title,
                    genre: review.movie.genre,
                    releaseYear: review.movie.releaseYear,
                },
            }));

            res.status(200).json({
                message: `Opinie użytkownika ${userId}`,
                reviews: reviewData,
            });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};
