const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const userService = require('./../services/userService');
const AppError = require('./../utils/appError');
const errorController = require('./errorController')

function signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

function createSendToken(user, statusCode, req, res) {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

async function signup(req, res) {
    try {
        console.log("creating user: ", req.body);
        const newUser = await userService.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        createSendToken(newUser, 201, req, res);
    }

    catch (error) {
        errorController(error, req, res);
    }
}

async function login(req, res, next) {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await userService.getUserWithPasswordByEmail(email);
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
}

function logout(req, res) {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};


module.exports = { signup, login, logout }