import fetch from 'node-fetch';
import { api } from '../util/constants.js';
import { delay } from '../util/delay.js';

/**
 * Returns all the user's friends.
 * @param token Discord token
 * @returns {Promise<Object[]>}
 */
export const list = async token => {
    const res = await fetch(`${api()}users/@me/relationships`, {
        headers: {
            'Host': 'discord.com',
            'User-Agent': process.env.useragent,
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Authorization': token
        }
    });

    return res.json();
}

/**
 * Remove a list of friends by a list of IDs.
 * @param {string[]} ids List of friends to be removed by ID.
 * @param {string} token Discord Token.
 */
export const remove = async (ids, token) => {
    const XContextProperties = Buffer.from(JSON.stringify({
        location: 'ContextMenu'
    })).toString('base64'); // Discord tracking...

    for (const id of ids) {
        const res = await fetch(`${api()}users/@me/relationships/${id}`, {
            method: 'DELETE',
            headers: {
                'Host': 'discord.com',
                'User-Agent': process.env.useragent,
                'Accept': '*/*',
                'Accept-Language': 'en-US',
                'X-Context-Properties': XContextProperties,
                'Authorization': token,
                'X-Super-Properties': process.env.super_properties
            }
        });

        if (res.status !== 204) {
            throw new Error(`Received status ${res.status} (${res.statusText}).`);
        }
        
        await delay(Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)); // 1-2 second delay
    }

    return true;
}