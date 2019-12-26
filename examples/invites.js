const ask = require('../src/util/ask');
const join = require('../src/invites');

const serverJoin = async () => {
    const invites = await ask('List all invite codes here (separated by a space): ');
    const token = await ask('Post your account token here: ');

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