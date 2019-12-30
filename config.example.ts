/**
 * X-Super-Properties header for Discord. This **can be** filled with random values (note: *NOT KEYS*); it has no effect on functionality.
 */
const super_properties = Buffer.from(JSON.stringify({
    'os': 'Windows',
    'browser': 'Firefox',
    'device':'',
    'browser_user_agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0',
    'browser_version':'72.0',
    'os_version':'10',
    'referrer':'',
    'referring_domain':'',
    'referrer_current':'',
    'referring_domain_current':'',
    'release_channel':'stable',
    'client_build_number':51863,
    'client_event_source':null}
)).toString('base64');

const useragent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0';
const smspva = '';
const captcha = '';

export {
    useragent,
    super_properties,
    smspva,
    captcha
}