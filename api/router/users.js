const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const checkAuth = require("../middleware/checkAuth");

router.get("/", checkAuth, userController.getAllUsers);

module.exports = router;
