const fetch = require('node-fetch');
const { randomBytes } = require('crypto');
const { useragent } = require('../config');

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
const Connection = async ({ name, token, type }) => {
    const body = JSON.stringify({
        name: name,
        visibility: Math.floor(Math.random() * 2)
    });

    const platform = type || ['leagueoflegends', 'battlenet', 'skype'][Math.floor(Math.random() * 3)];
    const res = await fetch(`https://discordapp.com/api/v6/users/@me/connections/${platform}/${randomBytes(5).toString('hex')}`, {
        method: 'PUT',
        body: body,
        headers: {
            'Host': 'discordapp.com',
            'Authorization': token,
            'Accept-Language': 'en-US',
            'User-Agent': useragent,
            'Accept': '*/*',
            'Content-Type': 'application/json',
        }
    });

    return res.ok;
}

module.exports = Connection;
