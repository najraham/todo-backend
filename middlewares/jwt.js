const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, process.env.APP_SECRET, (err, authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

module.exports = verifyToken;