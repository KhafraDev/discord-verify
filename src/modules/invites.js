import fetch from 'node-fetch';

/**
 * Join a Discord server.
 * @param {string} invite Invite code to the server 
 * @param {string} token Discord account token.
 */
const join = async (invite, token) => {
    const ContextProperties = await XContextProperties(invite);
    if(typeof ContextProperties !== 'string') {
        throw new Error(JSON.stringify(ContextProperties));
    }

    const res = await fetch('https://discordapp.com/api/v6/invites/' + invite, {
        method: 'POST',
        headers: {
            'Host': 'discordapp.com',
            'Content-Type': 'application/json',
            'User-Agent': process.env.useragent,
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'X-Context-Properties': ContextProperties,
            'Authorization': token,
            'X-Super-Properties': process.env.super_properties,
        }
    });

    if(res.status === 200) {
        return res.json();
    } else {
        return false;
    }
}

/**
 * Get a guild object given an invite code required for ``X-Context-Properties``.
 * @param {string} code The invite code
 */
const XContextProperties = async code => {
    const res = await fetch('https://discordapp.com/api/v6/invites/' + code);
    
    const json = await res.json(); // even errors are in json format
    if(res.status === 200) {
        return Buffer.from(JSON.stringify({
            location: 'Accept Invite Page', // static
            location_guild_id: json.guild.id,
            location_channel_id: json.channel.id,
            location_channel_type: json.channel.type
        })).toString('base64');
    } else {
        return json;
    }
}

export default join;