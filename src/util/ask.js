import { createInterface } from 'readline';
import { promisify } from 'util';

/**
 * Answer a question
 * @param {string} p Question to ask.
 * @returns {Promise<string>} Answer to the question. 
 */
const ask = async p => {
    const readline = createInterface({ 
        input: process.stdin, 
        output: process.stdout 
    });
    
    readline.question[promisify.custom] = q => new Promise(resolve => readline.question(q, resolve));
    
    const answer = await promisify(readline.question)(p);
    readline.close();

    return answer;
}

export default ask;