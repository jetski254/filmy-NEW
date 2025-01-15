const Rental = require("../models/rental");
const User = require("../models/user");
const Movie = require("../models/movie");


exports.createRental = (req, res) => {
    const { userId, movieId, rentalDate } = req.body;  

    
    if (!userId || !movieId || !rentalDate) {
        return res.status(400).json({ message: "Brakuje wymaganych danych" });
    }

   
    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "Użytkownik nie znaleziony" });
            }

           
            return Movie.findById(movieId);
        })
        .then((movie) => {
            if (!movie) {
                return res.status(404).json({ message: "Film nie znaleziony" });
            }

            const rental = new Rental({
                user: userId,
                movie: movieId,
                rentalDate: rentalDate,
            });

            return rental.save();  
        })
        .then(() => {
            res.status(201).json({ message: "Wypożyczenie utworzone pomyślnie" });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};


exports.getRentalsByUser = (req, res) => {
    const { userId } = req.params;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                throw new Error("Użytkownik nie znaleziony");
            }

            return Rental.find({ user: userId }).populate("movie");
        })
        .then((rentals) => {
            if (rentals.length === 0) {
                return res.status(404).json({ message: "Brak wypożyczeń dla tego użytkownika" });
            }

            const rentalData = rentals.map((rental) => ({
                rentalDate: rental.rentalDate,
                movie: {
                    title: rental.movie.title,
                    genre: rental.movie.genre,
                    releaseYear: rental.movie.releaseYear,
                },
            }));

            res.status(200).json({
                message: `Wypożyczenia użytkownika ${userId}`,
                rentals: rentalData,
            });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};
