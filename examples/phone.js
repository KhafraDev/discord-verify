const { getNumber, getSMS, phone, phone_code } = require('../src/index');
const prompts = require('prompts');
const { delay } = require('../src/util/delay');

/**
 * Send in a request or wait until you are no longer rate-limited.
 * @param {string} number Phone number used
 * @param {string} token Discord account token.
 * @returns {Promise<{ message: string }>}
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

(async () => {
    const { token } = await prompts({
        type: 'text',
        name: 'token',
        message: 'Discord Token:'
    });

    const { number, id, CountryCode } = await getNumber();
    if(!number || !id || !CountryCode) throw new Error('Missing 1 or more phone number parameters.');

    const text = await send(`${CountryCode}${number}`, token);
    if(text.message !== 'sent SMS code') throw new Error('SMS code NOT sent!');

    const { sms } = await getSMS(id);
    await phone_code(sms, token);

    console.log('Verified phone number!');
})();