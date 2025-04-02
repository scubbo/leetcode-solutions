import * as fs from 'fs';

async function doIt(): Promise<void> {
    const countsPerLetter: Record<string, number> = {};
    
    // Convert fs.readFile to use Promises
    const data = await fs.promises.readFile('/usr/share/dict/words', 'utf-8');
    
    console.log(data.split('\n').slice(0, 5));
    for (const word of data.split('\n')) {
        const firstLetter = word.split('')[0];
        const curVar = countsPerLetter[firstLetter] || 0;
        countsPerLetter[firstLetter] = curVar + 1;
    }
    
    console.log(countsPerLetter);
}

doIt();