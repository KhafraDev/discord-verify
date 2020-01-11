import join from '../src/invites.js';
import prompts = require('prompts');

(async () => {
    const { invites, token } = await prompts([
        {
            type: 'text',
            name: 'invites',
            message: 'Invites separated by a space:'
        },
        {
            type: 'text',
            name: 'token',
            message: 'Discord Token:'
        }
    ]);

    for(const i of invites.split(/\s+/g)) {
        const res = await join(i.trim(), token);
        console.log(res ? `Joined guild ${res.guild.name} (${res.guild.id})!` : `Did not join guild ${i}.`);
    }
})();