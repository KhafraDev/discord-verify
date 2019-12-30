import join from '../src/invites.js';
import prompts = require('prompts');

const serverJoin = async () => {
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
        if(!res) {
            console.error('Did not join guild %s.', i);
        } else {
            console.log('Joined guild %s (%s)!', res.guild.name, res.guild.id);
        }
    }
}

serverJoin();