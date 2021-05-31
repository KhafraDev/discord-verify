import fetch from 'node-fetch';
import { api } from '../util/constants.js';

/**
 * Get the X-Fingerprint Header = require(Discord
 */
export const fingerprint = async () => {
    const ContextProperties = Buffer.from(JSON.stringify({ 
        location: 'Login' 
    })).toString('base64');

    const res = await fetch(`${api()}experiments`, {
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'Host': 'discord.com',
            'User-Agent': process.env.useragent,
            'X-Fingerprint': '',
            'X-Context-Properties': ContextProperties // somehow missed this completely
        }
    });

    if (res.status === 200) {
        return res.json();
    } else if (res.status === 403) {
        throw new Error('Status 403 received, try using a different IP address.');
    }
    
    throw new Error(`Received status ${res.status} (${res.statusText}).`);
}