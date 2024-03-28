
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.isAuth = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        next();
    } else {
        const token = tokenHeader.split(' ')[1];
        if (token) {
            try {
                const verify = jwt.verify(token, process.env.SECRET_KEY);
                req.user = verify;
                next();
            } catch (err) {
                console.log(err);
                res.status(401).json({ message: 'Token invalide' });
            }
        }
    }
};
