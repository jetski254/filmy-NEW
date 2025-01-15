const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentals"); 
const checkAuth = require("../middleware/checkAuth");

router.get("/user/:userId", checkAuth, rentalController.getRentalsByUser);

router.post("/", checkAuth, rentalController.createRental);  

module.exports = router;
