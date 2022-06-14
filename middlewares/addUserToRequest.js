const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const userService = require('./../services/userService');
const middlewareHelper = require('./middlewareHelper');

module.exports = async (req, res, next) => {
    try {
        // 1) Getting token and check of it's there
        const token = middlewareHelper.getTokenFromRequest(req);
        if (!token) {
            return next();
        }

        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) Check user 
        const currentUser = await userService.getById(decoded.id);
        req.user = currentUser;
        return next();
    }
    catch (error) {
        return next();
    }
}

