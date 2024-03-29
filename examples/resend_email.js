import { confirmation } from '../src/index.js';
import prompts from 'prompts';

(async () => {
    const { token } = await prompts({
        type: 'text',
        name: 'token',
        message: 'Discord Token:'
    });

    const res = await confirmation(token);
    console.log(res ? 'Re-sent confirmation email' : 'Did not re-send confirmation email');
})();