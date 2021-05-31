import fetch from 'node-fetch';

/**
 * Get a random avatar from https://unsplash.com/
 */
export const getAvatar = async () => {
    const res = await fetch('https://source.unsplash.com/random');
    const buffer = await res.buffer();

    return 'data:' + res.headers.get('Content-Type') + ';base64,' + Buffer.from(buffer).toString('base64');
}