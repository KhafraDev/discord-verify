import check from '../src/name';
import prompts = require('prompts');
import { resolve } from 'dns';

const Check = async () => {
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

    for(let i = 0; i < run; i++) {
        const res = await check(username, password, token);
        if(typeof res === 'string') {
            console.log('%d. %s', i, res);
        } else {
            console.log('%d. Changed usernames!', i);
            break; // exit for loop
        }
        await delay(Math.floor(Math.random() * (7000 - 2000 + 1) + 2000)); // delay anywhere from 7 seconds to 2 seconds.
    }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

Check();