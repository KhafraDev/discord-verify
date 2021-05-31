import { user } from '../src/index.js';
import prompts from 'prompts';

(async () => {
    const { token } = await prompts({
        type: 'text',
        name: 'token',
        message: 'Discord Token:'
    });
    
    try {
        const User = await user(token);
        const isValid = User.verified === false && User.mfa_enabled === false && User.phone === null;
        console.log(isValid ? 'Token is valid:' : 'Token is not valid:', User);
    } catch(err) {
        console.error(err.message);
    }
})();