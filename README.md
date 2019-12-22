# discord-account-verifier
Verify and secure Discord accounts.

# Requirements
* [NodeJS](https://nodejs.org).
* node-fetch, ``npm i node-fetch``.
* SMSPVA API key.

# How to Use
1. Clone this repo to a folder of your choosing. 
2. Go to the folder and open the [config](./config.example.js) file. If you change the useragent, you must also change the values in super_properties.
3. Run the program with the required arguments, for example: ``node secure.js new_email@gmail.com new_password``.

# No Captcha? 
The program doesn't require Captcha because it makes direct calls to the Discord API. Instead of verifying using Captcha, an Authorization header is used to verify the account is real.

# WIP
* Automation
* Proxy support ([node-https-proxy-agent](https://github.com/TooTallNate/node-https-proxy-agent)?)