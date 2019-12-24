const super_properties = Buffer.from(JSON.stringify({
    'os': 'Windows',
    'browser': 'Firefox',
    'device': '',
    'browser_version': '71',
    'os_version': '10',
    'browser_user_agent': exports.useragent,
    'referrer': '',
    'referring_domain': '',
    'referrer_current': '',
    'referring_domain_current': '',
    'release_channel': 'stable',
    'client_build_number': 35116,
    'client_event_source': null
})).toString('base64');

module.exports = {
    token: '',
    useragent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/71.0',
    password: '',

    super_properties: super_properties,
    
    smspva: '',
    captcha: ''
}