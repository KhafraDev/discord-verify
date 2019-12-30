import Verify from '../src/email.js';
import prompts = require('prompts');

/**
 * Verify it, it's pretty simple.
 * @param {string} url URL from the email, **can be the proxied URL**! 
 */
const verify = async () => {
    const { token, url } = await prompts([
        {
            type: 'text',
            name: 'token',
            message: 'Discord Token:'
        },
        {
            type: 'text',
            name: 'url',
            message: 'Email Verification URL:'
        }
    ]);

    const res = await Verify(url, token);
    console.log(res);
}

verify();