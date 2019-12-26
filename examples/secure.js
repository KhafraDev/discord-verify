const ask = require('../src/util/ask');
const { modify } = require('../src/account');
const { getNumber, getSMS, phone, phone_code } = require('../src/phone');

/**
 * Run all the steps in required order needed to secure an account (other than verifying its email).
 */
const secure = async () => {
    const token = await ask('Post your account token here: ');
    const password = await ask('Post the account\'s current password: ');
    const new_email = await ask('Post the email to change to: ');
    const new_password = await ask('Post the password to change to: ');

    const { number, id, CountryCode } = await getNumber();
    if(!number || !id || !CountryCode) throw new Error('Missing 1 or more phone number parameters.');

    const text = await send(`${CountryCode}${number}`, token);
    if(text.message !== 'sent SMS code') throw new Error('SMS code NOT sent!');

    const { sms } = await getSMS(id);
    await phone_code(sms, token);

    const modified = await modify({ email: new_email, new_password: new_password, password: password, token: token });
    console.log(modified);
}

/**
 * Send in a request or wait until you are no longer rate-limited.
 * @param {string} number Phone number used
 * @param {string} token Discord account token.
 */
const send = async (number, token) => {
    let p = await phone(number, token);
    while(p.message === 'You are being rate limited.') {
        console.log('rate limited for %d seconds (+10)', Number(p.retry_after / 1000));
        await delay(p.retry_after + 10000); // retry_limit + 10 seconds
        p = await phone(number, token);
    }

    return { message: 'sent SMS code' };
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

secure();