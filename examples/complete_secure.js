import { 
    modify, 
    getNumber, 
    getSMS, 
    phone,
    phone_code, 
    verify, 
    list, 
    remove, 
    avatar 
} from '../src/index.js';

import prompts from 'prompts';
import { delay } from '../src/util/delay.js';

/**
 * Send in a request or wait until you are no longer rate-limited.
 * @param {string} number Phone number used
 * @param {Promise<{ message: string }>} token Discord account token.
 */
const send = async (number, token) => {
    let p = await phone(number, token);
    while (p.message === 'You are being rate limited.') {
        console.log('Rate-limited for %d seconds (+10)', Number(p.retry_after / 1000));
        await delay(p.retry_after + 10000); // retry_limit + 10 seconds
        p = await phone(number, token);
    }

    return { message: 'sent SMS code' };
}

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
    if (!number || !id || !CountryCode) { 
        throw new Error('Missing 1 or more phone number parameters.');
    }

    const text = await send(`${CountryCode}${number}`, token);
    if (text.message !== 'sent SMS code') {
        throw new Error('SMS code NOT sent!');
    }

    const { sms } = await getSMS(id);
    await phone_code(sms, token);

    const modified = await modify({
        avatar: await avatar(), 
        email: new_email, 
        new_password: new_password, 
        password: password, 
        token: token 
    });

    const { url } = await prompts({
        type: 'text',
        name: 'url',
        message: 'Email Verification URL:'
    });

    await verify(url, modified.token);
    console.log('Account is secured.', modified);

    const friends = (await list(modified.token)).map(f => f.id);
    console.log('Removing %d friends!', friends.length);
    await remove(friends, modified.token);
    console.log('Removed all friends!');
})();