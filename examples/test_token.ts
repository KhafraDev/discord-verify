import { user } from '../src/account';
import prompts = require('prompts');

(async () => {
    const { token } = await prompts({
        type: 'text',
        name: 'token',
        message: 'Discord Token:'
    });
    
    try {
        const User = await user(token);
        console.log('Token is valid:', User);
    } catch(err) {
        console.error(err.message);
    }
})();