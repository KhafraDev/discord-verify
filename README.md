# discord-account-verifier
Verify and secure Discord accounts.

# Requirements
* NodeJS (tested on v13.5.0) and NPM.
* ``typescript``, ``node-fetch``, ``user-agents``, and ``prompts``.
* 2captcha API key.
* SMSPVA API key.
* Account's token and password minimum.

# How to Use
1. Clone this repo to a folder of your choosing and cd to the folder. 
2. Install the dependencies using: ``npm i typescript node-fetch @types/node-fetch @types/prompts @types/user-agents user-agents``.
3. Open the [config](./config.example.ts) file and insert your SMSPVA and 2Captcha API keys.
4. Rename ``config.example.ts`` to ``config.ts``.
5. Compile the typescript using: ``tsc``. This will output the files to the [test directory](./test).
6. Run the compiled JS using: ``node /path/to/file``. For example, ``node test/examples/secure``.