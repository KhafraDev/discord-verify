import { format } from 'util';
import fetch from 'node-fetch';

import { captcha } from '../../config.js';

/**
 * Halt program execution for ``ms`` milliseconds.
 * @param {number} ms Milliseconds to delay. 
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const key = '6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn'; // static key (?)

/**
 * Solve a Captcha and return the key needed to bypass.
 * @param {string} verify_url The Discord verification URL
 * @returns {Promise<string>} Captcha key
 */
const solveCaptcha = async (verify_url: string): Promise<string> => {
    const baseURL = format(`https://2captcha.com/in.php?key=%s&method=userrecaptcha&googlekey=%s&pageurl=%s&json=1`, captcha, key, verify_url);
    const res = await fetch(baseURL);
    const request = await res.text();

    if(!parseInt(request.slice(3))) throw new Error(`Received request "${request}"`)

    let text: string;
    while(typeof text !== 'string') {
        console.log('No result yet, waiting 30 seconds.');
        await delay(30000);

        text = await (await fetch(format('https://2captcha.com/res.php?key=%s&id=%s&action=get', captcha, request.slice(3)))).text();
        text = text === 'CAPCHA_NOT_READY' || text.substring(0, 3) !== 'OK|' ? null : text;
    }

    return text.substring(3);
}

export default solveCaptcha;