const fetch = require('node-fetch');

/**
 * Get the X-Fingerprint Header = require(Discord
 */
const fingerprint = async () => {
    const ContextProperties = Buffer.from(JSON.stringify({ 
        location: 'Login' 
    })).toString('base64');

    const res = await fetch('https://discordapp.com/api/v6/experiments', {
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'Host': 'discordapp.com',
            'User-Agent': process.env.useragent,
            'X-Fingerprint': '',
            'X-Context-Properties': ContextProperties // somehow missed this completely
        }
    });

    if(res.status === 200) {
        return res.json();
    } else if(res.status === 403) {
        throw new Error('Status 403 received, try using a different IP address.');
    }
    
    throw new Error(`Received status ${res.status} (${res.statusText}).`);
}

module.exports = fingerprint;