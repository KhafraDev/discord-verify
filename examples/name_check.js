const { name } = require('../src/index');
const prompts = require('prompts');
const { delay } = require('../src/util/delay');

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

    for(let i = 0; i < run; i++) {
        const res = await name(username, password, token);
        if(typeof res === 'string') {
            console.log('%d. %s', i + 1, res);
        } else {
            console.log('%d. Changed usernames!', i + 1);
            break; // exit for loop
        }
        await delay(Math.floor(Math.random() * (2000 - 1000 + 1) + 1000));
    }
})();