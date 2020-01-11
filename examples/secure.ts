import { modify } from '../src/account.js';
import { getNumber, getSMS, phone, phone_code } from '../src/phone.js';
import prompts = require('prompts');

/**
 * Send in a request or wait until you are no longer rate-limited.
 * @param {string} number Phone number used
 * @param {Promise<{ message: string }>} token Discord account token.
 */
const send = async (number: string, token: string): Promise<{ message: string }> => {
    let p = await phone(number, token);
    while(p.message === 'You are being rate limited.') {
        console.log('rate limited for %d seconds (+10)', Number(p.retry_after / 1000));
        await delay(p.retry_after + 10000); // retry_limit + 10 seconds
        p = await phone(number, token);
    }

    return { message: 'sent SMS code' };
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const { token, password, new_email, new_password } = await prompts([
        {
            type: 'text',
            name: 'token',
            message: 'Discord Token:'
        },
        {
            type: 'text',
            name: 'password',
            message: 'Current password:'
        },
        {
            type: 'text',
            name: 'new_email',
            message: 'New email:'
        },
        {
            type: 'text',
            name: 'new_password',
            message: 'New password:'
        }
    ]);

    const { number, id, CountryCode } = await getNumber();
    if(!number || !id || !CountryCode) { 
        throw new Error('Missing 1 or more phone number parameters.');
    }

    const text = await send(`${CountryCode}${number}`, token);
    if(text.message !== 'sent SMS code') {
        throw new Error('SMS code NOT sent!');
    }

    const { sms } = await getSMS(id);
    await phone_code(sms, token);

    const modified = await modify({ 
        email: new_email, 
        new_password: new_password, 
        password: password, 
        token: token 
    });
    
    console.log('Finished securing!', modified);
})();