import UserAgent from 'user-agents';
const Agent = new UserAgent().random().data;

/**
 * X-Super-Properties header for Discord. Do **NOT** modify this unless you know what you're doing!
 */
const super_properties = Buffer.from(JSON.stringify({
    'os': Agent.platform,
    'browser': ['Firefox', 'Chrome', 'Edge', 'Brave'][Math.floor(Math.random() * 4)],
    'device':'',
    'browser_user_agent': Agent.userAgent,
    'browser_version': (Math.random() * (999.99 - 1.0 + 1) + 1.0).toFixed(3),
    'os_version': '' + [10, 9, 8, 7][Math.floor(Math.random() * 4)],
    'referrer': '',
    'referring_domain': '',
    'referrer_current': '',
    'referring_domain_current': '',
    'release_channel': 'stable',
    'client_build_number': Math.floor(Math.random() * (99999 - 10000 + 1) + 10000),
    'client_event_source': null
})).toString('base64');

process.env.super_properties = super_properties;
process.env.useragent = Agent.userAgent;

require(process.cwd() + '/config');
