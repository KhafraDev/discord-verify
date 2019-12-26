const { createInterface } = require('readline');
const { promisify } = require('util');

const readline = createInterface({ 
    input: process.stdin, 
    output: process.stdout 
});

readline.question[promisify.custom] = q => new Promise(resolve => readline.question(q, resolve));

/**
 * Answer a question
 * @param {string} p Question to ask.
 * @returns {Promise<string>} Answer to the question. 
 */
const ask = p => promisify(readline.question)(p);

module.exports = ask;