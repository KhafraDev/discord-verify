/**
 * Sleep
 * @param {number} ms Milliseconds to delay program by.
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));