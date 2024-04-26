const jwt = require("jsonwebtoken");

export default (req, res, next) => {
    try {
        const authToken = req.header("Authorization");
        const token = authToken.split(" ")[1];

        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};