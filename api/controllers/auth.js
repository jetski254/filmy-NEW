const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: "Błąd szyfrowania hasła" });

        const user = new User({
            email: req.body.email,
            password: hash,
            name: req.body.name,
        });

        user.save()
            .then(result => res.status(201).json({ message: "Użytkownik utworzony", user: result }))
            .catch(err => res.status(500).json({ message: err.message }));
    });
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(401).json({ message: "Błędne dane logowania" });

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (!result) return res.status(401).json({ message: "Błędne dane logowania" });

                const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWTkey, { expiresIn: "1d" });
                res.status(200).json({ token });
            });
        })
        .catch(err => res.status(500).json({ message: err.message }));
};
