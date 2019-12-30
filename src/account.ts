import fetch from 'node-fetch';
import { super_properties, useragent } from '../config.js';
import { IModify, IModifyUser } from './types/index';

/**
 * Fetch the user object from discord.
 */
const user = async (token: string): Promise<IModifyUser> => {
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
 * @returns {Promise<object|string>} Response object
 */
const changeLanguage = async (language: string, token: string): Promise<object|string> => {
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
 * @returns {Promise<boolean>}
 */
const changeHypesquadHouse = async (id: string, token: string): Promise<boolean> => {
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
 * @param {object} options User options
 * @returns {Promise<object>} User object
 */
const modify = async ({ email, new_password, avatar, language, token, password }: IModify): Promise<object> => {
    const userObj = await user(token);
    await changeLanguage(language || 'en-US', token);

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

    return res.json();
}

export {
    modify,
    changeHypesquadHouse
}