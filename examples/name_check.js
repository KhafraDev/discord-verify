import { check } from '../src/index.js';
import prompts from 'prompts';
import { delay } from '../src/util/delay.js';


(async () => {    
    const { username, password, token, run } = await prompts([
        {
            type: 'text',
            name: 'username',
            message: 'New username:'
        },
        {
            type: 'text',
            name: 'password',
            message: 'Password:'
        },
        {
            type: 'text',
            name: 'token',
            message: 'Discord Token:'
        },
        {
            type: 'number',
            name: 'run',
            message: 'Number of times to run:'
        }
    ]);

    for (let i = 0; i < run; i++) {
        const res = await check(username, password, token);
        if (typeof res === 'string') {
            console.log('%d. %s', i + 1, res);
        } else {
            console.log('%d. Changed usernames!', i + 1);
            break; // exit for loop
        }
        await delay(Math.floor(Math.random() * (2000 - 1000 + 1) + 1000));
    }
})();