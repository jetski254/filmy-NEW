
const User = require("../models/user");

exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ message: err.message }));
};
