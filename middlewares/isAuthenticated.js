const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const userService = require('./../services/userService');
const AppError = require('./../utils/appError');
const middlewareHelper = require('./middlewareHelper');

module.exports = async (req, res, next) => {
    try {
        // 1) Getting token and check of it's there
        const token = middlewareHelper.getTokenFromRequest(req);
        if (!token) {
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401)
            );
        }

        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const currentUser = await userService.getById(decoded.id);
        if (!currentUser) {
            return next(
                new AppError(
                    'The user belonging to this token does no longer exist.',
                    401
                )
            );
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    }
    catch (error) {
        return next(
            new AppError('Error Authenticating User.', 500)
        );
    }
}

