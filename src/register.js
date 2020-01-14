const fetch = require('node-fetch');
const { randomBytes } = require('crypto');
const Fingerprint = require('./fingerprint');
const { super_properties, useragent } = require('../config');
const solveCaptcha = require('./util/solve_captcha');

/**
 * Try to register an account.
 */
const register = async ({ email, username, captcha }) => {
    const { fingerprint } = await Fingerprint();
    const body = JSON.stringify({
        fingerprint: fingerprint,
        email: email ? email : 'test@gmail.com',
        username: username,
        password: randomBytes(4).toString('hex'),
        invite: null,
        consent: true,
        gift_code_sku_id: null,
        captcha_key: captcha ? await solveCaptcha('https://discordapp.com/register') : null
    });

    const res = await fetch('https://discordapp.com/api/v6/auth/register', {
        method: 'POST',
        body: body,
        headers: {
            'Host': 'discordapp.com',
            'User-Agent': useragent,
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'X-Super-Properties': super_properties, 
            'X-Fingerprint': fingerprint
        }
    });

    return res.json();
}

module.exports = register;