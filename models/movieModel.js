const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required!']
    },
    description: {
        type: String,
        required: [true, 'description is required!']
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    like: {
        type: Number,
        default: 0
    },
    hate: {
        type: Number,
        default: 0
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;