const { modify } = require('./account');

const check = async (name, password, token) => {
    const json = await modify({ username: name, password: password, token: token });
    if(Array.isArray(json.username)) {
        return json.username[0];
    } else if(json.username === name) {
        return true;
    }
}

module.exports = check;