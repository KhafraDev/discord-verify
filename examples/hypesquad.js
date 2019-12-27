const IDs = {
    1: 'Bravery',
    2: 'Brilliance',
    3: 'Balance'
}

import ask from '../src/util/ask.js';
import { changeHypesquadHouse } from '../src/account.js';

const change = async () => {
    const id = await ask('Which House would you like to change to? ');
    const token = await ask('What is the account\'s token? ');

    console.log('Changing your house to %s', IDs[Number(id)]);
    const res = await changeHypesquadHouse(id, token);
    console.log('%s', res ? 'Changed houses!' : 'Did not change houses!');
}

change();