const fetch = require('node-fetch');
const { super_properties, useragent } = require('../config');

/**
 * Fetch the user object from discord.
 */
const user = async token => {
    const res = await fetch('https://discordapp.com/api/v6/users/@me', {
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

const changeLanguage = async (language, token) => {
    const body = JSON.stringify({ locale: language });
    const res = await fetch('https://discordapp.com/api/v6/users/@me/settings', {
        method: 'PATCH',
        body: body,
        headers: {
            'Host': 'discordapp.com',
            'User-Agent': useragent,
            'Accept': '*/*',
            'Accept-Language': language,
            'Content-Type': 'application/json',
            'Authorization': token,
            'X-Super-Properties': super_properties,
            'Content-Length': Buffer.from(body).byteLength,
            'Origin': 'https://discordapp.com',
            'Referer': 'https://discordapp.com/channels/@me/'
        }   
    });

    if(res.status === 200) {
        return res.json();
    } else {
        return res.text();
    }
}

/**
 * Change or join a HypeSquad house. This does cause "glitchy" behavior as the menu in settings does not update to reflect the changes. 
 * @example
 * const IDs = {
 *  1: 'Bravery',
 *  2: 'Brilliance',
 *  3: 'Balance'
 * }
 * @param {number} id 1, 2, or 3
 * @param {string} token Discord account token.
 */
const changeHypesquadHouse = async (id, token) => {
    const body = JSON.stringify({ house_id: Number(id) >= 1 && Number(id) <= 3 ? id : 1 });
    const res = await fetch('https://discordapp.com/api/v6/hypesquad/online', {
        method: 'POST',
        body: body,
        headers: {
            'Host': 'discordapp.com',
            'User-Agent': useragent, 
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'Authorization': token,
            'X-Super-Properties': super_properties, 
            'Content-Length': Buffer.from(body).byteLength,
            'Origin': 'https://discordapp.com',  
            'Referer': 'https://discordapp.com/channels/@me'
        }
    });

    if(res.status === 204) {
        const success = (await res.text()) === '';
        return success;
    } else {
        return false;
    }
}

/**
 * Modify the user's password, email, and/or language.
 * @param {{ email: string, new_password: string, avatar: string, language: string, token: string, password: string }} options User options
 * @returns {boolean} true|false based on request status 
 */
const modify = async ({ email, new_password = null, avatar, language = 'en-US', token, password } = {}) => {
    const userObj = await user(token);
    await changeLanguage(language);

    const body = JSON.stringify({
        username: userObj.username,
        email: email || userObj.email,
        password: password,
        avatar: avatar || userObj.avatar,
        discriminator: null,
        new_password: new_password
    });

    const res = await fetch('https://discordapp.com/api/v6/users/@me', {
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
        return res.text(); // ????
    }
}

module.exports = {
    modify,
    changeHypesquadHouse
};