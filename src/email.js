const fetch = require('node-fetch');
const { format } = require('util');

const { useragent, super_properties, captcha } = require('../config');
const fingerprint = require('./fingerprint');

/**
 * Halt program execution for ``ms`` milliseconds.
 * @param {number} ms Milliseconds to delay. 
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const key = '6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn'; // static key

/**
 * Solve a Captcha and return the key needed to bypass.
 * @param {string} verify_url The Discord verification URL
 */
const solveCaptcha = async verify_url => {
    const baseURL = format(`https://2captcha.com/in.php?key=%s&method=userrecaptcha&googlekey=%s&pageurl=%s&json=1`, captcha, key, verify_url);
    const res = await fetch(baseURL);
    const { status, request } = await res.json();
    console.log('Sent initial request to 2captcha, received status %d.', status);

    let text;
    while(!text) {
        console.log('No result yet, waiting 30 seconds.');
        await delay(30000);

        text = await (await fetch(format('https://2captcha.com/res.php?key=%s&id=%s&action=get', captcha, request))).text();
        text = text === 'CAPCHA_NOT_READY' || text.substring(0, 3) !== 'OK|' ? null : text;
    }

    return text.substring(3);
}

/**
 * Verify an email.
 * @param {string} verify_url The Discord verification URL
 * @param {string} token Discord account token.
 */
const verify = async (verify_url, token) => {
    const redirect_ = await redirect(verify_url);
    const token_ = new URL(redirect_).searchParams.get('token');
    const captcha_key = await solveCaptcha(redirect_);
    const body = JSON.stringify({ 
        token: token_,
        captcha_key: captcha_key
    });
    
    const fp = await fingerprint();
    const res = await fetch('https://discordapp.com/api/v6/auth/verify', {
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
            'X-Fingerprint': fp.fingerprint,
            'Content-Length': Buffer.from(body).byteLength,
            'Origin': 'https://discordapp.com',
            'Referer': redirect_
        }
    });

    const text = await res.text();
    console.log(text);
    return text;
}

const redirect = async url => {
    const res = await fetch(url);
    return res.url;
}

module.exports = verify;
