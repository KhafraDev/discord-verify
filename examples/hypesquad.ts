import { changeHypesquadHouse } from '../src/account.js';
import prompts = require('prompts');

const change = async () => {
    const { id, token } = await prompts([
        {
            type: 'text',
            name: 'id',
            message: 'ID of house to join:',
            validate: (id: string) => parseInt(id) > 0 && parseInt(id) < 4 ? true : 'IDs can be 1 (Bravery), 2 (Brilliance), or 3 (Balance).'
        },
        {
            type: 'text',
            name: 'token',
            message: 'Discord Token:'
        }
    ])

    const res = await changeHypesquadHouse(id, token);
    console.log(res ? 'Changed houses!' : 'Did not change houses!');
}

change();