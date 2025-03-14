
/**
 * You are given two 0-indexed arrays of strings startWords and targetWords. Each string consists of lowercase English letters only.
 *
 * For each string in targetWords, check if it is possible to choose a string from startWords and perform a conversion operation on it to be equal to that from targetWords.
 *
 * The conversion operation is described in the following two steps:
 *
 *    Append any lowercase letter that is not present in the string to its end.
 *        For example, if the string is "abc", the letters 'd', 'e', or 'y' can be added to it, but not 'a'. If 'd' is added, the resulting string will be "abcd".
 *    Rearrange the letters of the new string in any arbitrary order.
 *        For example, "abcd" can be rearranged to "acbd", "bacd", "cbda", and so on. Note that it can also be rearranged to "abcd" itself.
 *
 * Return the number of strings in targetWords that can be obtained by performing the operations on any string of startWords.
 * 
 * Note that you will only be verifying if the string in targetWords can be obtained from a string in startWords by performing the operations. The strings in startWords do not actually change during this process.
 */
export function wordCount(startWords: string[], targetWords: string[]): number {
    // To check for anagrams, reduce to canonical form (e.g. sorted letters)
    const alphabetizedStartWordsSet = new Set<string>();
    startWords.forEach((w) => {
        alphabetizedStartWordsSet.add(alphabetize(w))
    })

    return targetWords.map(alphabetize).map((w) => {
        for (let i=0; i<w.length; i++) {
            if (alphabetizedStartWordsSet.has(w.slice(0, i) + w.slice(i+1, w.length))) {
                return 1;
            }
        }
        return 0;
    }).reduce((a: number, b: number) => a+b, 0);

}



// Exported for testing
export function alphabetize(w: string): string {
    return w.split('').sort().join('');
}

