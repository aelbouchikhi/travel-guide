const { body, validationResult } = require("express-validator");

exports.validatorMiddleware = [
    body("email")
        .notEmpty()
        .withMessage("Username required")
        .isLength({ min: 3 })
        .withMessage("Username must be more than 3 carracters!"),
    body("password")
        .notEmpty()
        .withMessage("Password required")
        .isLength({ min: 3 })
        .withMessage("Password must be more than 8 carracters!"),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(404).json({ error: error.array() });
        next();
    },
];
