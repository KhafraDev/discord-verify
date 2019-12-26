const ask = require('../src/util/ask');
const { getNumber, getSMS, phone, phone_code } = require('../src/phone');

/**
 * Verify a phone number on an account.
 * Useful if you do not wish to modify the user or locked out of your own account because of phone verification.
 */
const phoneVerify = async () => {
    const token = await ask('Post your account token here: ');

    const { number, id, CountryCode } = await getNumber();
    if(!number || !id || !CountryCode) throw new Error('Missing 1 or more phone number parameters.');

    const text = await send(`${CountryCode}${number}`, token);
    if(text.message !== 'sent SMS code') throw new Error('SMS code NOT sent!');

    const { sms } = await getSMS(id);
    await phone_code(sms, token);

    console.log('finished.');
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

phoneVerify();