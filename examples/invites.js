import { invites } from '../src/index.js';
import prompts from 'prompts';

(async () => {
    const { invite, token } = await prompts([
        {
            type: 'text',
            name: 'invite',
            message: 'Invites separated by a space:'
        },
        {
            type: 'text',
            name: 'token',
            message: 'Discord Token:'
        }
    ]);

    for (const i of invite.split(/\s+/g)) {
        const res = await invites(i.trim(), token);
        console.log(res ? `Joined guild ${res.guild.name} (${res.guild.id})!` : `Did not join guild ${i}.`);
    }
})();