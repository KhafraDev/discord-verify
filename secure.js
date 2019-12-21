const Modify = require('./src/account');
const { getNumber, getSMS, phone, phone_code } = require('./src/phone');

if(process.argv.length < 4) process.exit();

const secure = async () => {
    try {
        const { number, id, CountryCode } = await getNumber();
        if(!number || !id || !CountryCode) throw new Error('Missing 1 or more phone number parameters.');

        const text = await send(`${CountryCode}${number}`);
        console.log(text.message);

        if(text.message !== 'sent SMS code') throw new Error('SMS code NOT sent!');

        const { sms } = await getSMS(id);
        console.log('Received SMS %s', sms);

        const code = await phone_code(sms);
        console.log(code.message);

        const modified = await Modify({ email: process.argv[2], new_password: process.argv[3] });
        if(modified) {
            console.log('User modified, process is finished!');
        } else {
            console.log('User was NOT modified!');
        }
    } catch(err) {
        console.error('An error occured securing the account:\n', err);
    }
}

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