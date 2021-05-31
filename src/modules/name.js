import { modify } from './account.js';

const check = async (name, password, token) => {
    const json = await modify({ username: name, password: password, token: token });
    if (Array.isArray(json.username)) {
        return json.username[0];
    } else if (json.username === name) {
        return true;
    }
}

export default check;