const User = require('./../models/userModel');

function create({ name, email, password }) {
    return User.create({
        name,
        email,
        password
    });
}

function getUserWithPasswordByEmail(email) {
    return User.findOne({ email }).select('+password').exec();
}

function getById(id) {
    return User.findById(id).exec();
}

module.exports = { create, getUserWithPasswordByEmail, getById }