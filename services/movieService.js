const movieRepository = require('./../repositories/movieRepository');

function create({ title, description, postedBy }) {
    return movieRepository.create({
        title,
        description,
        postedBy
    });
}

async function canUserVoteForMovie(userId, movieId) {
    const movie = await movieRepository.findById(movieId);
    return (String(movie.postedBy) !== String(userId));
}

async function increaseMoviesVoteCounterForRatingType(movieId, rating) {
    return movieRepository.increaseMoviesVoteCounterForRatingType(movieId, rating);
}

async function decreaseMoviesVoteCounterForRatingType(movieId, rating) {
    return movieRepository.decreaseMoviesVoteCounterForRatingType(movieId, rating);
}

function getAllMoviesWithUsersVote(userId, sortedBy) {
    return movieRepository.getAllMoviesWithUsersVote(userId, sortedBy);
}

function getAllMovies(sortedBy) {
    return movieRepository.getAllMovies(sortedBy);
}

function getAllUsersMoviesWithUsersVote(userId, sortedBy) {
    return movieRepository.getAllUsersMoviesWithUsersVote(userId, sortedBy);
}

function getAllUsersMovies(sortedBy) {
    return movieRepository.getAllUsersMovies(sortedBy);
}

module.exports = {
    create,
    canUserVoteForMovie,
    increaseMoviesVoteCounterForRatingType,
    decreaseMoviesVoteCounterForRatingType,
    getAllMoviesWithUsersVote,
    getAllMovies,
    getAllUsersMoviesWithUsersVote,
    getAllUsersMovies
}
