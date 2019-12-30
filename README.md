# discord-account-verifier
Verify and secure Discord accounts.

# Requirements
* [NodeJS](https://nodejs.org).
* node-fetch, ``npm i node-fetch``.
* SMSPVA API key.

# Requirements
* NodeJS (tested on v13.5.0) and NPM.
* ``typescript``, ``node-fetch``, and ``prompts``.
* 2captcha API key.
* SMSPVA API key.
* Account's token and password minimum.

# How to Use
1. Clone this repo to a folder of your choosing and cd to the folder. 
2. Install the dependencies using: ``npm i --save-dev typescript node-fetch @types/node-fetch @types/prompts``.
3. Open the [config](./config.example.ts) file. I recommend editing the super_properties values, including user-agent, but do not change the keys.
4. Rename ``config.example.ts`` to ``config.ts``.
5. Compile the typescript using: ``tsc /path/to/file``. For example, to secure an account run: ``tsc examples/secure``.
6. Run the compiled JS using: ``node /path/to/file``. For example, ``node examples/secure``.

