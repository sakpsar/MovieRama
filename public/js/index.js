import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { addMovie } from './addMovie';
import { vote, deleteVote } from './vote';

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const addMovieForm = document.querySelector('.form--addmovie');
const logOutBtn = document.querySelector('.nav__el--logout');
const likeBtns = document.querySelectorAll('.like--btn');
const hateBtns = document.querySelectorAll('.hate--btn');
const deleteVoteBtns = document.querySelectorAll('.delete-vote--btn');

if (likeBtns)
    likeBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const likeObject = JSON.parse(e.target.dataset.voteObject);
            vote({ movieId: likeObject.movieId, rating: likeObject.rating });
        });
    });
if (hateBtns)
    hateBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const likeObject = JSON.parse(e.target.dataset.voteObject);
            vote({ movieId: likeObject.movieId, rating: likeObject.rating });
        });
    });
if (deleteVoteBtns)
    deleteVoteBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const voteId = e.target.dataset.voteid;
            deleteVote(voteId);
        });
    });
if (loginForm)
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
if (signupForm)
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
        signup(email, password, name);
    });
if (addMovieForm)
    addMovieForm.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        addMovie(title, description);
    });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);