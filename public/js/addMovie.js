import { get, post } from '../../clients/httpClient';
import { showAlert } from './alerts';

export const addMovie = async (title, description) => {
    try {
        const url = `${process.env.APP_URL ? process.env.APP_URL : 'http://127.0.0.1:8000'}/api/v1/movies`;
        const res = await post(url, { title, description });

        if (res.status === 'success') {
            showAlert('success', 'Added movie successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};