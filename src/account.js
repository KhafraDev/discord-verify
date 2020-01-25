const fetch = require('node-fetch');
const { super_properties, useragent } = require('../config.js');

/**
 * Fetch the user object = require(discord.
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

/**
 * Change a user's language
 * @param {string} language 
 * @param {string} token 
 */
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
        }   
    });

    return res.json();
}

/**
 * Change or join a HypeSquad house. This does cause "glitchy" behavior as the menu in settings does not update to reflect the changes. 
 * @example
 * const IDs = {
 *  0: 'Leave HypeSquad',
 *  1: 'Bravery',
 *  2: 'Brilliance',
 *  3: 'Balance'
 * }
 * @param {number} id 1, 2, or 3
 * @param {string} token Discord account token.
 * @returns {Promise<boolean>}
 */
const changeHypesquadHouse = async (id, token) => {
    const body = JSON.stringify({ house_id: id });
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
        }
    });

    if(res.status === 204) {
        return (await res.text()) === '';
    } else {
        return false;
    }
}

/**
 * Modify the user's password, email, and/or language.
 * @param {object} options User options
 */
const modify = async ({ username, email, new_password, avatar, language, token, password }) => {
    const userObj = await user(token);
    await changeLanguage(language || 'en-US', token);

    const body = JSON.stringify({
        username: username || userObj.username,
        email: email || userObj.email,
        password: password,
        avatar: avatar || userObj.avatar || null,
        discriminator: null,
        new_password: new_password || null
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

    return res.json();
}

module.exports = {
    modify,
    changeHypesquadHouse,
    user
}