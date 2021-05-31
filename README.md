### THIS MODULE IS NOT ACTIVELY MAINTAINED
* Do not use this unless you are willing to fix outstanding issues or test.
* Do not expect this to work with Discord's current api version and changes to api routes they might have made.

# discord-account-verifier
Verify, register, and secure Discord accounts.

# Requirements
* NodeJS (tested on v16.2.0) and NPM.
* ``node-fetch``, ``user-agents``, and ``prompts``.
* 2captcha API key.
* SMSPVA API key.

# How to Use
1. Clone this repo to a folder of your choosing and cd to the folder. 
2. Install the dependencies using: ``npm i node-fetch user-agents prompts``.
3. Open the [config](./config.example.js) file and insert your SMSPVA and 2Captcha API keys.
4. Rename ``config.example.js`` to ``config.js``.
5. Run a module using: ``node /path/to/file``. For example, ``node test/examples/complete_secure``.