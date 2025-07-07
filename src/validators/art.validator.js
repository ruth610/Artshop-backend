const { body } = require('express-validator');

exports.createArtValidator = [
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('quantity').isInt({ min: 0 }),
  body('category').isIn(['painting', 'sculpture', 'digital']),
];
