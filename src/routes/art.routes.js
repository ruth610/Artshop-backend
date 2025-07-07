const express = require('express');
const controller = require('../controllers/art.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const { createArtValidator } = require('../utils/art.validation');
const { validationResult } = require('express-validator');

const router = express.Router();

/**
 * Public: GET /art
 */
router.get('/', controller.findAll);

/**
 * Public: GET /art/:id
 */
router.get('/:id', controller.findOne);

/**
 * Admin only: POST /art
 */
router.post(
  '/',
  isAuthenticated,
  isAdmin,
  upload.single('image'),
  createArtValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  controller.create
);

/**
 * Admin only: PATCH /art/:id
 */
router.patch('/:id', isAuthenticated, isAdmin, controller.update);

/**
 * Admin only: DELETE /art/:id
 */
router.delete('/:id', isAuthenticated, isAdmin, controller.remove);

module.exports = router;
