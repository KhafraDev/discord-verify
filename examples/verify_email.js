import ask from '../src/util/ask.js';
import Verify from '../src/email.js';

/**
 * Verify it, it's pretty simple.
 * @param {string} url URL from the email, **not the proxied URL**! 
 */
const verify = async () => {
    const url = await ask('Post the URL from the email: ');
    const token = await ask('Post your account token here: ');
    await Verify(url, token);
}

verify();