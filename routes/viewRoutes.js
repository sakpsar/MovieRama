const express = require('express');
const viewsController = require('../controllers/viewsController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router.get('/', isLoggedIn, viewsController.getMovies);
router.get('/movies/user/:id', isLoggedIn, viewsController.getMoviesByUser);
router.get('/login', isLoggedIn, viewsController.getLoginForm);
router.get('/signup', isLoggedIn, viewsController.getSignupForm);
router.get('/submitMovie', isLoggedIn, viewsController.getAddMovieForm);

module.exports = router;