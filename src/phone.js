const fetch = require('node-fetch');
const { useragent, super_properties, token, smspva } = require('../config');

const phone_url = 'https://discordapp.com/api/v6/users/@me/phone';
const phone_verify_url = 'https://discordapp.com/api/v6/users/@me/phone/verify';

/**
 * Send an initial request for a SMS code.
 * @param {string} n Phone number (including country code!)
 */
const phone = async n => {
    const payload = JSON.stringify({
        phone: n
    });

    try {
        const res = await fetch(phone_url, {
            method: 'POST',
            body: payload,
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'en-US',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.from(payload).byteLength,
                'Host': 'discordapp.com',
                'Origin': 'https://discordapp.com',
                'Referer': 'https://discordapp.com/channels/@me',
                'User-Agent': useragent,
                'Authorization': token,
                'X-Super-Properties': super_properties
            },
        });

        const text = await res.text();
        
        if(text === '') { // empty response, sent SMS code
            return { message: 'sent SMS code' };
        } else {
            return JSON.parse(text); // typically when ratelimited
        }
    } catch(err) {
        throw err;
    }
}

/**
 * Send the SMS code to be verified.
 * @param {number} code 
 */
const phone_code = async (code) => {
    const payload = JSON.stringify({
        code: code
    });

    try {
        const res = await fetch(phone_verify_url, {
            method: 'POST',
            body: payload,
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'en-US',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.from(payload).byteLength,
                'Host': 'discordapp.com',
                'Referer': 'https://discordapp.com/channels/@me',
                'User-Agent': useragent,
                'Authorization': token,
                'X-Super-Properties': super_properties
            }
        });

        const text = await res.text();

        if(text === '') { // empty response, sent SMS code
            return { message: 'verified SMS code!' };
        } else {
            return JSON.parse(text); // ????
        }
    } catch(err) {
        throw err;
    }
}

/**
 * Get a phone number to send the SMS to
 * @returns {Object} Object
 */
const getNumber = async () => {
    const url = 'http://smspva.com/priemnik.php?metod=get_number&country=RU&service=opt45&apikey=' + smspva;

    try {
        const res = await fetch(url);
        if(res.status !== 200) throw new Error(`Received status ${number.status} (${number.statusText}).`);
        
        return res.json();
    } catch(err) {
        throw err;
    }
}

/**
 * Get the SMS messages
 * @param {number} id 
 * @returns {Object} Object
 */
const getSMS = async id => {
    const url = 'http://smspva.com/priemnik.php?metod=get_sms&country=ru&service=opt45&apikey=' + smspva + '&id=' + id;

    try {
        let sms, MAX_RETRIES = 7;
        while(!sms && MAX_RETRIES >= 0) {
            console.log('Looking for SMS, %d tries remaining.', MAX_RETRIES);
            const res = await fetch(url);
            const json = await res.json();

            if(json.response === '3') throw new Error('number expired!');
            if(json.response === '1' && !!json.sms) sms = json;

            MAX_RETRIES--;
            await delay(30000);
        }

        if(!sms) throw new Error('No code was sent, retry later.');
        return sms;
    } catch(err) {
        throw err;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    phone,
    phone_code,
    getNumber,
    getSMS
};