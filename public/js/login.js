import { get, post } from '../../clients/httpClient';
import { showAlert } from './alerts';

export const login = async (email, password) => {
    try {
        const url = `${process.env.APP_URL ? process.env.APP_URL : 'http://127.0.0.1:8000'}/api/v1/users/login`;
        const res = await post(url, { email, password });

        if (res.status === 'success') {
            showAlert('success', 'Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

export const logout = async () => {
    try {
        const url = `${process.env.APP_URL ? process.env.APP_URL : 'http://127.0.0.1:8000'}/api/v1/users/logout`;
        const res = await get(url);
        if ((res.status = 'success')) location.reload(true);
    } catch (err) {
        showAlert('error', 'Error logging out! Try again.');
    }
};