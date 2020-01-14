const fetch = require('node-fetch');
const { stringify } = require('querystring');
const { useragent, super_properties, smspva } = require('../config');
const { delay } = require('./util/delay');

/**
 * Send an initial request for a SMS code.
 * @param {string} n Phone number (including country code!)
 * @param {string} token Discord account token.
 */
const phone = async (n, token) => {
    const body = JSON.stringify({ phone: n });

    const res = await fetch('https://discordapp.com/api/v6/users/@me/phone', {
        method: 'POST',
        body: body,
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'Host': 'discordapp.com',
            'User-Agent': useragent,
            'Authorization': token,
            'X-Super-Properties': super_properties
        },
    });

    const text = await res.text();
    
    return text === '' ? { message: 'sent SMS code' } : JSON.parse(text);
}

/**
 * Send the SMS code to be verified.
 * @param {number} code 
 * @param {string} token Discord account token.
 */
const phone_code = async (code, token) => {
    const body = JSON.stringify({ code: code });

    const res = await fetch('https://discordapp.com/api/v6/users/@me/phone/verify', {
        method: 'POST',
        body: body,
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'Host': 'discordapp.com',
            'User-Agent': useragent,
            'Authorization': token,
            'X-Super-Properties': super_properties
        }
    });

    return (await res.text()) === '';
}

/**
 * Get a phone number to send the SMS to
 */
const getNumber = async () => {
    const res = await fetch('http://smspva.com/priemnik.php?' + stringify({
        metod: 'get_number',
        country: 'RU', // can be changed
        service: 'opt45',
        apikey: smspva
    }))

    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error(`Received status ${res.status} (${res.statusText}).`);
    }
}

/**
 * Get the SMS messages
 * @param {number} id 
 * @param {boolean} perfect_accuracy Enable perfect, 10 minute, accuracy.
 */
const getSMS = async id => {
    while(true) {
        const res = await fetch('http://smspva.com/priemnik.php?' + stringify({
            metod: 'get_sms',
            country: 'ru',
            service: 'opt45',
            apikey: smspva,
            id: id
        }));
        const json = await res.json();

        switch(json.response) {
            case '1': return json;
            case '3': throw 'Phone number expired!'
        }

        await delay(30000);
    }
}


module.exports = {
    phone,
    phone_code,
    getNumber,
    getSMS
}