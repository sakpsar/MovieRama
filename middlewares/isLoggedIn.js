const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const userService = require('./../services/userService');

module.exports = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await userService.getById(decoded.id);
            if (!currentUser) {
                return next();
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            return next();
        } catch (err) {
            console.log("error in is loggedin: ", err)
            return next();
        }
    }
    return next();
};