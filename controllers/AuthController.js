
const User=require("../models/user")
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required!"
        });
    }
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: "Internal Server Error"
            });
        }
        const newUser = new User({ username, password: hashedPassword });

        newUser.save()
            .then(() => {
                res.status(201).json({
                    success: true,
                    message: "User created successfully"
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    success: false,
                    error: "Internal Server Error"
                });
            });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            error: "Username and password both are required"
        });
    }

    User.findOne({ username: username })
        .then(existingUser => {
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: "Username does not exist"
                });
            }

            
            bcrypt.compare(password, existingUser.password, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        success: false,
                        error: "Internal Server Error"
                    });
                }

                if (!result) {
                    return res.status(401).json({
                        success: false,
                        message: "Incorrect password"
                    });
                }
                res.status(200).json({
                    success: true,
                    message: "Login successful"
                });
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                error: "Internal Server Error"
            });
        });
};
