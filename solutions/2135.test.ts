import { wordCount, alphabetize } from './2135';

describe('alphabetize', () => {
    test('basic', () => {
        expect(alphabetize('drefk')).toEqual('defkr')
    }) 
})

describe('Overall', () => {
    test('basic', () => {
        expect(wordCount(['ant', 'act', 'tack'], ['tack', 'act', 'acti'])).toEqual(2)
        expect(wordCount(['ab', 'a'], ['abc', 'abcd'])).toEqual(1);
    })
})

