# discord-account-verifier
Verify, register, and secure Discord accounts.

# Benefits
* Tested on hundreds of accounts, used daily.
* Open sourced under the MIT license with example use given.
* Modulated with examples on how to use each section.

# Requirements
* NodeJS (tested on v13.5.0) and NPM.
* ``node-fetch``, ``user-agents``, and ``prompts``.
* 2captcha API key.
* SMSPVA API key.

# How to Use
1. Clone this repo to a folder of your choosing and cd to the folder. 
2. Install the dependencies using: ``npm i node-fetch user-agents prompts``.
3. Open the [config](./config.example.js) file and insert your SMSPVA and 2Captcha API keys.
4. Rename ``config.example.js`` to ``config.js``.
5. Run a module using: ``node /path/to/file``. For example, ``node test/examples/complete_secure``.