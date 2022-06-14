const mongoose = require('mongoose')
const Movie = require('./../models/movieModel');
const helper = require('./movieRepositoryHelper');

function create({ title, description, postedBy }) {
    return Movie.create({
        title,
        description,
        postedBy // : mongoose.Types.ObjectId(postedBy)
    });
}

function findById(movieId) {
    return Movie.findById(movieId).exec();
}

function increaseMoviesVoteCounterForRatingType(movieId, rating) {
    const update = rating === 'like' ? { $inc: { like: 1 } } : { $inc: { hate: 1 } };
    return Movie.findOneAndUpdate({ _id: movieId }, update).exec();
}

async function decreaseMoviesVoteCounterForRatingType(movieId, rating) {
    const update = rating === 'like' ? { $inc: { like: -1 } } : { $inc: { hate: -1 } };
    return Movie.findOneAndUpdate({ _id: movieId }, update).exec();
}

function getAllMoviesWithUsersVote(userId, sortedBy) {
    return Movie.aggregate([{
        $lookup: {
            from: "votes",
            let: {
                id: "$_id"
            },
            pipeline: [
                {
                    $match: {
                        $expr:
                        {
                            $and:
                                [
                                    { $eq: ["$movie", "$$id"] },
                                    { $eq: ["$postedBy", userId] }
                                ]
                        }
                    }
                }
            ],
            as: "usersVote"
        }
    }, {
        $lookup: {
            from: "users",
            let: {
                postedBy: "$postedBy"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: ["$_id", "$$postedBy"]
                        }
                    }
                },
                {
                    $project: { _id: 1, name: 1 }
                }
            ],
            as: "user"
        }
    }, helper.createSortQueryObject(sortedBy)]).exec()
}

function getAllMovies(sortedBy) {
    return Movie.aggregate([{
        $lookup: {
            from: "users",
            let: {
                postedBy: "$postedBy"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: ["$_id", "$$postedBy"]
                        }
                    }
                },
                {
                    $project: { _id: 1, name: 1 }
                }
            ],
            as: "user"
        }
    }, helper.createSortQueryObject(sortedBy)]).exec()
}

function getAllUsersMoviesWithUsersVote(posterUserId, userId, sortedBy) {
    return Movie.aggregate([{ $match: { postedBy: mongoose.Types.ObjectId(posterUserId) } },
    {
        $lookup: {
            from: "votes",
            let: {
                id: "$_id"
            },
            pipeline: [
                {
                    $match: {
                        $expr:
                        {
                            $and:
                                [
                                    { $eq: ["$movie", "$$id"] },
                                    { $eq: ["$postedBy", userId] }
                                ]
                        }
                    }
                }
            ],
            as: "usersVote"
        }
    }, {
        $lookup: {
            from: "users",
            let: {
                postedBy: "$postedBy"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: ["$_id", "$$postedBy"]
                        }
                    }
                },
                {
                    $project: { _id: 1, name: 1 }
                }
            ],
            as: "user"
        }
    }, helper.createSortQueryObject(sortedBy)]).exec()
}

function getAllUsersMovies(posterUserId, sortedBy) {
    return Movie.aggregate([{ $match: { postedBy: mongoose.Types.ObjectId(posterUserId) } },
    {
        $lookup: {
            from: "users",
            let: {
                postedBy: "$postedBy"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: ["$_id", "$$postedBy"]
                        }
                    }
                },
                {
                    $project: { _id: 1, name: 1 }
                }
            ],
            as: "user"
        }
    }, helper.createSortQueryObject(sortedBy)]).exec()
}

module.exports = {
    create,
    findById,
    increaseMoviesVoteCounterForRatingType,
    decreaseMoviesVoteCounterForRatingType,
    getAllMoviesWithUsersVote,
    getAllMovies,
    getAllUsersMoviesWithUsersVote,
    getAllUsersMovies
}