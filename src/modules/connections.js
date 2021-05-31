import fetch from 'node-fetch';
import { randomBytes } from 'crypto';
import { api } from '../util/constants.js';

/**
 * Add a connection to an account.
 * @param {{ name: string, token: string, type?: string }} options 
 * @example // types that can be used
 * const type = [
 *  'leagueoflegends',
 *  'battlenet',
 *  'skype'
 * ]
 */
export const Connection = async ({ name, token, type }) => {
    const body = JSON.stringify({
        name: name,
        visibility: Math.floor(Math.random() * 2)
    });

    const platform = type || ['leagueoflegends', 'battlenet', 'skype'][Math.floor(Math.random() * 3)];
    const res = await fetch(`${api()}users/@me/connections/${platform}/${randomBytes(5).toString('hex')}`, {
        method: 'PUT',
        body: body,
        headers: {
            'Host': 'discord.com',
            'Authorization': token,
            'Accept-Language': 'en-US',
            'User-Agent': process.env.useragent,
            'Accept': '*/*',
            'Content-Type': 'application/json',
        }
    });

    return res.ok;
}
