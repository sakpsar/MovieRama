const express = require('express');
const movieController = require('../controllers/movieController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const addUserToRequest = require('../middlewares/addUserToRequest');

const router = express.Router();

router.post('/', isAuthenticated, movieController.create);
router.get('/', addUserToRequest, movieController.get);
router.get('/user/:id', addUserToRequest, movieController.getByUser);

module.exports = router;