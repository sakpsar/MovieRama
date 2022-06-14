const httpClient = require('../clients/httpClient');

async function getMovies(req, res) {
    try {
        const sortedBy = req.query?.sort;
        const jwtCookie = req.cookies?.jwt;
        let url = `${process.env.APP_URL ? process.env.APP_URL : 'http://127.0.0.1:8000'}/api/v1/movies`;
        url = sortedBy ? url + `?sort=${sortedBy}` : url;
        const response = await httpClient.get(url, jwtCookie);
        return res.status(200).render('movies', {
            movies: response.data.movies
        });
    }
    catch (error) {
        console.log("error in getMovies:", error)
    }

}

async function getMoviesByUser(req, res) {
    try {
        const userId = req.params.id;
        const jwtCookie = req.cookies?.jwt;
        const url = `${process.env.APP_URL ? process.env.APP_URL : 'http://127.0.0.1:8000'}/api/v1/movies/user/${userId}`;
        const response = await httpClient.get(url, jwtCookie);
        return res.status(200).render('movies', {
            movies: response.data.movies
        });
    }
    catch (error) {
        console.log("error in getMoviesByUser:", error)
    }

}

function getLoginForm(req, res) {
    res.status(200).render('login', {
        title: 'Log into your account'
    });
};

function getSignupForm(req, res) {
    res.status(200).render('signup', {
        title: 'Create account'
    });
};

function getAddMovieForm(req, res) {
    res.status(200).render('addmovie', {
        title: 'Add movie'
    });
};


module.exports = { getMovies, getMoviesByUser, getLoginForm, getSignupForm, getAddMovieForm }