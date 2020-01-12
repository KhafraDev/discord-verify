import fetch from 'node-fetch';
import { Friendlist } from 'discord-verify';
import { useragent, super_properties } from '../config';

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
                'Accept-Encoding': 'gzip, deflate, br',
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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export {
    list,
    remove
}