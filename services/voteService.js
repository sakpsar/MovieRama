const voteRepository = require('./../repositories/voteRepository');

function create({ rating, movie, postedBy }) {
    return voteRepository.create({
        rating, movie, postedBy
    });
}

async function userHasAlreadyVotedMovie(userId, movieId) {
    const numberOfVotes = await voteRepository.countUsersVotesForMovie(userId, movieId);
    return numberOfVotes > 0;
}

function getUsersVoteForMovie(userId, movieId) {
    return voteRepository.getUsersVoteForMovie(userId, movieId);
}

function deleteVoteById(voteId) {
    return voteRepository.deleteVoteById(voteId);
}

function getVoteById(voteId) {
    return voteRepository.getVoteById(voteId);
}

module.exports = { create, userHasAlreadyVotedMovie, getUsersVoteForMovie, deleteVoteById, getVoteById }