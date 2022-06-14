const AppError = require('./../utils/appError');
const errorController = require('./errorController');
const movieService = require('../services/movieService');

async function create(req, res, next) {
    try {
        const newMovie = await movieService.create({
            title: req.body.title,
            description: req.body.description,
            postedBy: req.user._id
        });

        res.status(201).json({
            status: 'success',
            data: {
                newMovie
            }
        });
    }
    catch (error) {
        errorController(error, req, res);
    }

}

async function get(req, res, next) {
    try {
        const sortedBy = req.query?.sort;
        if (req.user) {
            const movies = await movieService.getAllMoviesWithUsersVote(req.user._id, sortedBy);

            return res.status(201).json({
                status: 'success',
                data: {
                    movies
                }
            });
        }
        const movies = await movieService.getAllMovies(sortedBy);
        return res.status(201).json({
            status: 'success',
            data: {
                movies
            }
        });
    }
    catch (error) {
        errorController(error, req, res);
    }

}

async function getByUser(req, res, next) {
    try {
        const userPosterId = req.params.id;
        const sortedBy = req.query?.sort;
        if (req.user) {
            const movies = await movieService.getAllUsersMoviesWithUsersVote(userPosterId, req.user._id, sortedBy);

            return res.status(201).json({
                status: 'success',
                data: {
                    movies
                }
            });
        }
        const movies = await movieService.getAllUsersMovies(userPosterId, sortedBy);
        return res.status(201).json({
            status: 'success',
            data: {
                movies
            }
        });
    }
    catch (error) {
        errorController(error, req, res);
    }

}

module.exports = { create, get, getByUser }