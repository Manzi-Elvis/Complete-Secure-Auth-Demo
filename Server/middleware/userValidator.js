const { body, validationResult } = require('express-validator');

// Validation rules for user registration
exports.registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('age')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Age must be a positive number'),

  // Middleware to check errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return first error message only for simplicity
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];