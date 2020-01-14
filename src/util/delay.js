/**
 * Sleep
 * @param {number} ms Milliseconds to delay program by.
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = { delay };