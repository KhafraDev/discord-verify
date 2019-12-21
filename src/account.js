const fetch = require('node-fetch');
const { token, super_properties, useragent, password } = require('../config');
const url = 'https://discordapp.com/api/v6/users/@me';

const user = async () => {
    const res = await fetch(url, {
        headers: {
            Authorization: token
        }
    });

    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error(`Received status ${res.status} (${res.statusText}).`);
    }
}


/**
 * Modify the user's avatar, password, or email.
 * @param {{ email: string, new_password: string, avatar: string }} options User options
 * @returns {boolean} true|false based on request status 
 */
const modify = async ({ email, new_password, avatar } = {}) => {
    const userObj = await user();
    const body = JSON.stringify({
        username: userObj.username,
        email: email || userObj.email,
        password: password,
        avatar: avatar || userObj.avatar,
        discriminator: null,
        new_password: new_password || null
    });

    const res = await fetch(url, {
        method: 'PATCH',
        body: body,
        headers: {
            'Host': 'discordapp.com',
            'User-Agent': useragent,
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'Authorization': token,
            'X-Super-Properties': super_properties
        }
    });

    try {
        return res.json();
    } catch {
        return res.text();
    }
}

module.exports = modify;