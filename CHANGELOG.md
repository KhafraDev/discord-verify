# v1.0.0
* Initial release

# v1.0.1
* Fixed inconsistencies.

# v1.0.2
* Added in function to verify an email. You must pass in the URL as a parameter, but it is much better than having to solve a captcha. An example will be given at a later date on how to use.

# v1.0.3
* Language is now changed by default. It defaults to ``en-US`` unless you pass in a language parameter in the options to the modify method.
* Ability to change HypeSquad houses to your given house.
* Ability to join guilds given an invite code (if you are using the example, you can pass multiple in the program args).
* Added in [examples](./examples).
* Removed ``password`` and ``token`` from config. The program will now prompt the user to input these values themself.

# v1.0.4
* Moved to ESM module loader.
* Removed `Origin`, `Referer`, and `Content-Length` headers as they are [forbidden headers](https://fetch.spec.whatwg.org/#forbidden-header-name).