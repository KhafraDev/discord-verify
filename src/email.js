const fetch = require('node-fetch');

const { useragent, super_properties } = require('../config');
const Fingerprint = require('./fingerprint');
const solveCaptcha = require('./util/solve_captcha');

/**
 * Verify an email.
 * @param {string} verify_url The Discord verification URL
 * @param {string} token Discord account token.
 * @returns {Promise<string>} 
 */
const verify = async (verify_url, token) => {
    const redirect_url = await redirect(verify_url);
    const token_param = new URL(redirect_url.replace(/verify#token/g, 'verify?token')).searchParams.get('token');
    const captcha_key = await solveCaptcha(redirect_url);
    const body = JSON.stringify({ 
        token: token_param,
        captcha_key: captcha_key
    });
    
    const { fingerprint } = await Fingerprint();
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
            'X-Fingerprint': fingerprint,
        }
    });

    return res.text();
}

/**
 * Get the redirect URL
 * @param {string} url URL
 */
const redirect = async url => {
    const res = await fetch(url);
    return res.url;
}

/**
 * Resend email-confirmation email.
 * @param {string} token Discord Token.
 */
const confirmation = async token => {
    const { fingerprint } = await Fingerprint();
    const res = await fetch('https://discordapp.com/api/v6/auth/verify/resend', {
        method: 'POST',
        headers: {
            'Host': 'discordapp.com',
            'User-Agent': useragent,
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Authorization': token,
            'X-Super-Properties': super_properties,
            'X-Fingerprint': fingerprint
        }
    });

    return (await res.text()) === '' ? true : false;
}


module.exports = {
    verify,
    confirmation
};
