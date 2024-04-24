const jwt = require("jsonwebtoken");

export default (req, res, next) => {
    try {
        const token = req.header("Authorization");
        console.log(token)
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};