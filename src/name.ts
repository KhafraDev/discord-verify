import { modify } from './account';

const check = async (name: string, password: string, token: string): Promise<boolean|string> => {
    const json = await modify({ username: name, password: password, token: token });
    if(Array.isArray(json.username)) {
        return json.username[0];
    } else if(json.username === name) {
        return true;
    }
}

export default check;