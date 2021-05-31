import { verify } from '../src/index.js';
import prompts from 'prompts';

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