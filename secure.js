const Modify = require('./src/account');
const { getNumber, getSMS, phone, phone_code } = require('./src/phone');

/**
 * Run all the steps in required order needed to secure an account (other than verifying its email).
 */
const secure = async () => {
    try {
        const { number, id, CountryCode } = await getNumber();
        if(!number || !id || !CountryCode) throw new Error('Missing 1 or more phone number parameters.');

        const text = await send(`${CountryCode}${number}`);
        if(text.message !== 'sent SMS code') throw new Error('SMS code NOT sent!');

        const { sms } = await getSMS(id);
        await phone_code(sms);

        const modified = await Modify({ email: process.argv[2], new_password: process.argv[3] });
        console.log(modified);
    } catch(err) {
        console.error('An error occured securing the account:\n', err);
    }
}

/**
 * Send a code while also working around rate-limits.
 * @param {string|number} number Phone number 
 */
const send = async number => {
    let p = await phone(number);
    while(p.message === 'You are being rate limited.') {
        await delay(p.retry_after + 10000); // retry_limit + 10 seconds
        p = await phone(number);
    }

    return { message: 'sent SMS code' };
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

secure();