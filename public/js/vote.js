import { get, post, deleteMethod } from '../../clients/httpClient';
import { showAlert } from './alerts';

export const vote = async ({ movieId, rating }) => {
    try {
        const url = `${process.env.APP_URL ? process.env.APP_URL : 'http://127.0.0.1:8000'}/api/v1/votes/movie/${movieId}`;
        const res = await post(url, { rating });

        if (res.status === 'success') {
            showAlert('success', 'Voted successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

export const deleteVote = async (voteId) => {
    try {
        const url = `${process.env.APP_URL ? process.env.APP_URL : 'http://127.0.0.1:8000'}/api/v1/votes/${voteId}`;
        const res = await deleteMethod(url);

        if (res.status === 'success') {
            showAlert('success', 'Vote deleted successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};