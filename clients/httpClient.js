const axios = require('axios')

async function get(url, jwtCookie) {
    const requestObject = {
        method: 'GET',
        url
    };
    if (jwtCookie) {
        requestObject.headers = { Cookie: `jwt=${jwtCookie};` };
    }
    const response = await axios(requestObject);
    return response.data;
}

async function post(url, data, jwtCookie) {
    const requestObject = {
        method: 'POST',
        url,
        data
    };
    if (jwtCookie) {
        requestObject.headers = { Cookie: `jwt=${jwtCookie};` };
    }
    const response = await axios(requestObject);
    return response.data;
}

async function deleteMethod(url, jwtCookie) {
    const requestObject = {
        method: 'DELETE',
        url
    };
    if (jwtCookie) {
        requestObject.headers = { Cookie: `jwt=${jwtCookie};` };
    }
    const response = await axios(requestObject);
    return response.data;
}

module.exports = { get, post, deleteMethod }