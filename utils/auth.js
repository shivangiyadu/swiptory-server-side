const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    try {
        const headerToken = req.headers["authorization"];
        
        if (!headerToken) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        
        const token = headerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ errorMessage: "Invalid Token!" });
    }
};

module.exports = { authenticateToken };
