// const { body, validationResult } = require("express-validator");

// exports.validatorMiddleware = [
//     body("email")
//         .notEmpty()
//         .withMessage("Username required")
//         .isLength({ min: 3 })
//         .withMessage("Username must be more than 3 carracters!"),
//     body("password")
//         .notEmpty()
//         .withMessage("Password required")
//         .isLength({ min: 3 })
//         .withMessage("Password must be more than 8 carracters!"),
//     (req, res, next) => {
//         const error = validationResult(req);
//         if (!error.isEmpty()) return res.status(404).json({ error: error.array() });
//         next();
//     },
// ];

const { body, validationResult } = require("express-validator");

exports.validatorMiddleware = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric"),

  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("age")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age must be a non-negative integer")
    .toInt(),

  body("country").optional().trim(),

  body("sex")
    .optional()
    .isIn(["male", "female"])
    .withMessage("Invalid gender value"),

  body("phoneNumber")
    .optional()
    .trim()
    .matches(/\+?[1-9]\d{1,14}$/)
    .withMessage("Invalid phone number format"),

  body("image")
    .optional()
    .trim()
    .isURL()
    .withMessage("Image must be a valid URL"),

  // isVerified is not checked here because it's a boolean that defaults to false and is typically set internally rather than by user input.

  // Middleware to return errors collected by express-validator
  (req, res, next) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// module.exports = { validateUser, checkValidationResult };
