import { promisify } from 'util';

/**
 * Sleep
 * @param {number} ms Milliseconds to delay program by.
 */
export const delay = promisify(setTimeout);