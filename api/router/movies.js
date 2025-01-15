const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movies");
const checkAuth = require("../middleware/checkAuth");

router.get("/", movieController.getAllMovies);
router.post("/", checkAuth, movieController.createMovie);

module.exports = router;
