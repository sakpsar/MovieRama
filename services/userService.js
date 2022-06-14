const userRepository = require('./../repositories/userRepository');

function create({ name, email, password }) {
    return userRepository.create({ name, email, password });
}

async function getUserWithPasswordByEmail(email) {
    return userRepository.getUserWithPasswordByEmail(email);
}

function getById(id) {
    return userRepository.getById(id)
}

module.exports = { create, getUserWithPasswordByEmail, getById };