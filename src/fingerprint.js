const fetch = require('node-fetch');
const { useragent } = require('../config');
const url = 'https://discordapp.com/api/v6/experiments';

/**
 * Get the X-Fingerprint Header from Discord
 * @returns {Object} res.json() result.
 */
const fingerprint = async () => {
    try {
        const res = await fetch(url, {
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'en-US',
                'Content-Type': 'application/json',
                'Host': 'discordapp.com',
                'Referer': 'https://discordapp.com/login',
                'User-Agent': useragent,
                'X-Fingerprint': '',
            }
        });

        if(res.status === 200 && res.statusText === 'OK') {
            return res.json();
        } 
        
        throw new Error(`Received status ${res.status} (${res.statusText}).`);
    } catch(err) {
        throw err;
    }
}

module.exports = fingerprint;