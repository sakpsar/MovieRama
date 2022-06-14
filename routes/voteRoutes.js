const express = require('express');
const voteController = require('../controllers/voteController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { route } = require('./movieRoutes');

const router = express.Router();

router.post('/movie/:id', isAuthenticated, voteController.create);
router.delete('/:id', isAuthenticated, voteController.remove);

module.exports = router;