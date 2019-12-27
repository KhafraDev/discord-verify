import { format } from 'util';
import fetch from 'node-fetch';

import { captcha } from '../../config.js';

/**
 * Halt program execution for ``ms`` milliseconds.
 * @param {number} ms Milliseconds to delay. 
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const key = '6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn'; // static key (?)

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

export default solveCaptcha;