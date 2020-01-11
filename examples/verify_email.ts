import { verify } from '../src/email.js';
import prompts = require('prompts');

(async () => {
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

    const res = await verify(url, token);
    console.log(res);
})();