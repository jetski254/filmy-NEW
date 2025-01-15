const Movie = require("../models/movie");

exports.getAllMovies = (req, res) => {
    Movie.find()
        .then(movies => res.status(200).json(movies))
        .catch(err => res.status(500).json({ message: err.message }));
};

exports.createMovie = (req, res) => {
    const movie = new Movie(req.body);
    movie.save()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message }));
};
