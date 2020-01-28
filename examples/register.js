const { register } = require('../src/index');
const prompts = require('prompts');
const { delay } = require('../src/util/delay');

(async () => {
    const { username, email, run } = await prompts([
        {
            type: 'text',
            name: 'username',
            message: 'Name:'
        },
        {
            type: 'text',
            name: 'email',
            message: 'Email (leave blank to skip):'
        },
        {
            type: 'number',
            name: 'run',
            message: 'Number of times to run:'
        }
    ]);
    
    let res = await register({ email: email, username: username, captcha: false });
    for(let i = 1; i < run; i++) { // starts at 1 because it runs initially
        const options = {
            email: email === '' ? null : email,
            username: username,
            captcha: false
        }

        if(res.captcha_key) {
            options.captcha = true;
            res = await register(options);
        } else if(res.token) {
            console.log(res);
            break;
        } else {
            if(email !== '' && res.email) { // email supplied but an error with the email came back
                console.log(res.email[0]);
                break;
            } else if(res.username) {
                console.log('%d. %s', i, res.username[0]);
            }
        }

        await delay(Math.floor(Math.random() * (2000 - 1000 + 1) + 1000));
    }
})();