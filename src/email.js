import fetch from 'node-fetch';

import { useragent, super_properties } from '../config.js';
import fingerprint from './fingerprint.js';
import solveCaptcha from './util/solve_captcha.js';

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

export default verify;
