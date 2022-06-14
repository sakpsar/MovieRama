const AppError = require('./../utils/appError');
const errorController = require('./errorController');
const movieService = require('../services/movieService');
const voteService = require('../services/voteService');

async function create(req, res, next) {
    try {
        const userId = req.user._id;
        const movieId = req.params.id;

        if (!(await movieService.canUserVoteForMovie(userId, movieId))) {
            return next(new AppError('Can not vote your own movie', 403));
        }
        if ((await voteService.userHasAlreadyVotedMovie(userId, movieId))) {
            return next(new AppError('Can not vote a movie twice', 403));
        }
        const newVote = await voteService.create({
            rating: req.body.rating,
            movie: movieId,
            postedBy: userId
        });

        movieService.increaseMoviesVoteCounterForRatingType(movieId, req.body.rating).catch(error => { console.log(`Error on updating movies ${movieId} vote counter`) })

        res.status(201).json({
            status: 'success',
            data: {
                newVote
            }
        });
    }
    catch (error) {
        errorController(error, req, res);
    }

}

async function remove(req, res, next) {
    try {
        const userId = req.user._id;
        const voteId = req.params.id;

        const vote = await voteService.getVoteById(voteId);
        if (!vote) {
            return next(new AppError('Vote to delete not found', 404));
        }
        if (String(vote.postedBy) != userId) {
            return next(new AppError('Can not delete others user vote', 403));
        }

        const rating = vote.rating;
        await voteService.deleteVoteById(vote._id);

        movieService.decreaseMoviesVoteCounterForRatingType(vote.movie, rating).catch(error => { console.log(`Error on updating movies ${vote.movie} vote counter`) })

        res.status(201).json({
            status: 'success',
            data: {}
        });
    }
    catch (error) {
        errorController(error, req, res);
    }

}

module.exports = { create, remove }