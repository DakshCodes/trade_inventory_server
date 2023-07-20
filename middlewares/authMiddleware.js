const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    try {
        const token = req.header("authorization").split(" ")[1];
        console.log("Received Token:", token);

        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decrypted Token:", decryptedToken);

        req.body.userId = decryptedToken.userId;
        next();
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};
