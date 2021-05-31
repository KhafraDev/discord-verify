import fetch from 'node-fetch';
import { randomBytes } from 'crypto';
import { fingerprint as Fingerprint } from './fingerprint.js';
import { solveCaptcha } from '../util/solve_captcha.js';
import { api } from '../util/constants.js';

/**
 * Try to register an account.
 */
export const register = async ({ email, username, captcha }) => {
    const { fingerprint } = await Fingerprint();
    const body = JSON.stringify({
        fingerprint: fingerprint,
        email: email ? email : 'test@gmail.com',
        username: username,
        password: randomBytes(4).toString('hex'),
        invite: null,
        consent: true,
        gift_code_sku_id: null,
        captcha_key: captcha ? await solveCaptcha('https://discord.com/register') : null
    });

    const res = await fetch(`${api()}auth/register`, {
        method: 'POST',
        body: body,
        headers: {
            'Host': 'discord.com',
            'User-Agent': process.env.useragent,
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'X-Super-Properties': process.env.super_properties, 
            'X-Fingerprint': fingerprint
        }
    });

    return res.json();
}