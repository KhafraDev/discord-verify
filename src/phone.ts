import fetch from 'node-fetch';
import { useragent, super_properties, smspva } from '../config';
import { PhoneNumber, SMS, TextRequest } from 'discord-verify';

/**
 * Send an initial request for a SMS code.
 * @param {string} n Phone number (including country code!)
 * @param {string} token Discord account token.
 */
const phone = async (n: string, token: string): Promise<TextRequest> => {
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
    
    if(text === '') { // empty response, sent SMS code
        return { message: 'sent SMS code' };
    } else {
        return JSON.parse(text); // typically when ratelimited
    }
}

/**
 * Send the SMS code to be verified.
 * @param {number} code 
 * @param {string} token Discord account token.
 */
const phone_code = async (code: string, token: string): Promise<boolean> => {
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

    const text = await res.text();

    if(text === '') { // empty response, sent SMS code
        return true;
    } else {
        return false // ????
    }
}

/**
 * Get a phone number to send the SMS to
 */
const getNumber = async (): Promise<PhoneNumber> => {
    const res = await fetch('http://smspva.com/priemnik.php?metod=get_number&country=RU&service=opt45&apikey=' + smspva);

    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error(`Received status ${res.status} (${res.statusText}).`);
    }
}

/**
 * Get the SMS messages
 * @param {number} id 
 */
const getSMS = async (id: number): Promise<SMS> => {
    const url = 'http://smspva.com/priemnik.php?metod=get_sms&country=ru&service=opt45&apikey=' + smspva + '&id=' + id;

    for(let MAX_RETRIES = 7; MAX_RETRIES > 0; MAX_RETRIES--) {
        console.log('Looking for SMS, %d tries remaining.', MAX_RETRIES);
        const res = await fetch(url);
        const json = await res.json();

        if(json.response === '3') throw new Error('number expired!');
        if(json.response === '1' && !!json.sms) return json;

        await delay(30000);
    }

    throw new Error('No SMS received from Discord!');
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export {
    phone,
    phone_code,
    getNumber,
    getSMS
}