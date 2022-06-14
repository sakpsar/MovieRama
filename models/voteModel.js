const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    rating: {
        type: String,
        enum: ['like', 'hate'],
        required: [true, 'rating is required!']
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Movie'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;