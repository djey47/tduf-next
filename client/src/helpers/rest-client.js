function getOptions(method, body) {
    return {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body && JSON.stringify(body),
    };
}

function get(url, okCallback) {
    const options = getOptions('GET');

    fetch(url, options)
        .then(stream => stream.json())
        .then(okCallback)
        .catch(error => console.error(error));
}

function post(url, body, okCallback) {
    const options = getOptions('POST', body);

    fetch(url, options)
        .then(stream => stream.json())
        .then(okCallback)
        .catch(error => console.error(error));
}

module.exports = {
    get,
    post,
};
