const Vote = require('./../models/voteModel');

function create({ rating, movie, postedBy }) {
    return Vote.create({
        rating,
        movie,
        postedBy
    });
}

function countUsersVotesForMovie(userId, movieId) {
    return Vote.countDocuments({ postedBy: userId, movie: movieId }).exec()
}

function getUsersVoteForMovie(userId, movieId) {
    return Vote.findOne({ postedBy: userId, movie: movieId }).lean().exec()
}

function deleteVoteById(voteId) {
    return Vote.findByIdAndDelete(voteId).exec();
}

function getVoteById(voteId) {
    return Vote.findById(voteId).lean().exec();
}

module.exports = { create, countUsersVotesForMovie, getUsersVoteForMovie, deleteVoteById, getVoteById }