require('./util/prop');

module.exports = {
    ...require('./modules/account'),
    avatar: require('./modules/avatar'),
    connections: require('./modules/connections'),
    ...require('./modules/email'),
    fingerprint: require('./modules/fingerprint'),
    invites: require('./modules/invites'),
    name: require('./modules/name'),
    ...require('./modules/phone'),
    register: require('./modules/register'),
    ...require('./modules/relations')
}