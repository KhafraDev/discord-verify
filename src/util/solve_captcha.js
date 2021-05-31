import { stringify } from 'querystring';
import fetch from 'node-fetch';
import { delay } from './delay.js';

const key = '6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn'; // static key (?)

/**
 * Solve a Captcha and return the key needed to bypass.
 * @param {string} verify_url The Discord verification URL
 * @returns {Promise<string>} Captcha key
 */
export const solveCaptcha = async verify_url => {
    const res = await fetch('https://2captcha.com/in.php?' + stringify({
        key: process.env.captcha,
        method: 'userrecaptcha',
        googlekey: key,
        pageurl: verify_url
    }));
    const request = await res.text();

    if (!parseInt(request.slice(3))) throw new Error(`Received request "${request}"`);

    let text;
    while (typeof text !== 'string') {
        text = await (await fetch('https://2captcha.com/res.php?' + stringify({
            key: process.env.captcha,
            id: request.slice(3),
            action: 'get'
        }))).text();
        text = text === 'CAPCHA_NOT_READY' || text.substring(0, 3) !== 'OK|' ? null : text;
        
        await delay(30000);
    }

    return text.substring(3); // OK|[ID]
}