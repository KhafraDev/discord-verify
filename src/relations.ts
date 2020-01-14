import fetch from 'node-fetch';
import { Friendlist } from 'discord-verify';
import { useragent, super_properties } from '../config';
import { delay } from './util/delay';

/**
 * Returns all the user's friends.
 * @param token Discord token
 * @returns {Promise<Friendlist[]>}
 */
const list = async (token: string): Promise<Friendlist[]> => {
    const res = await fetch('https://discordapp.com/api/v6/users/@me/relationships', {
        headers: {
            'Host': 'discordapp.com',
            'User-Agent': useragent,
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
const remove = async (ids: string[], token: string): Promise<boolean> => {
    const XContextProperties = Buffer.from(JSON.stringify({
        location: 'ContextMenu'
    })).toString('base64');

    for(const id of ids) {
        const res = await fetch('https://discordapp.com/api/v6/users/@me/relationships/' + id, {
            method: 'DELETE',
            headers: {
                'Host': 'discordapp.com',
                'User-Agent': useragent,
                'Accept': '*/*',
                'Accept-Language': 'en-US',
                'X-Context-Properties': XContextProperties,
                'Authorization': token,
                'X-Super-Properties': super_properties
            }
        });

        if(res.status !== 204) {
            throw new Error(`Received status ${res.status} (${res.statusText}).`);
        }
        
        await delay(Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)); // 1-2 second delay
    }

    return true;
}

export {
    list,
    remove
}