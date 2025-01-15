const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviews"); 
const checkAuth = require("../middleware/checkAuth");

router.post("/", checkAuth, reviewController.addReview);
router.get("/user/:userId", checkAuth, reviewController.getReviewsByUser);

module.exports = router;
