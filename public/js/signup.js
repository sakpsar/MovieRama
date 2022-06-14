import { get, post } from '../../clients/httpClient';
import { showAlert } from './alerts';

export const signup = async (email, password, name) => {
    try {
        const url = `${process.env.APP_URL ? process.env.APP_URL : 'http://127.0.0.1:8000'}/api/v1/users/signup`;
        const res = await post(url, { email, password, name });

        if (res.status === 'success') {
            showAlert('success', 'Signed up successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};