# v1.0.0
* Initial TypeScript release (not functional).

# v1.0.1
* Full TypeScript compatability and examples.
* Tested and working.
* Fixed issues with master branch where 2captcha would sometimes return a text result even if json is specified.
* Replace ``khafradev/ask`` with ``prompts`` as it is more complete and feature-rich.

# v1.0.2
* Re-send email-confirmation email.
* Actual typings now.
* Determined return types for all functions.

# v1.0.3
* Module to test an available name or change an account's name.
* Added "complete_secure" example which will handle parts of email verification.

# v1.0.4
* Use ``user-agents`` to generate a random UserAgent for the X-Super-Properties header.
* Eventually move X-Super-Properties into its own file (refactoring).

# v1.0.5
* Add in ``test_token`` example module which allows you to test whether or not a token is valid before securing an account. The function was already available, but was not exported previously.
* Re-wrote Captcha solving module to be more reliable and accurate.