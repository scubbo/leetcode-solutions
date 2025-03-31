/**
 * An integer x is numerically balanced if for every digit d in the number x, there are exactly d occurrences of that digit in x.
 *
 * Given an integer n, return the smallest numerically balanced number strictly greater than n.
 * ---
 * First though - trivial to solve naively by just iterating up, let's first try it and see if it's got acceptable performance.
 * OTTOMH, some speedups could be recognizing that any number smaller than 10**n cannot include a number `n`.
 * Ah - perhaps this is decomposable into recurrence:
 *  - introduce concept of "balanced-with-deficit" ("this number would be balanced if it had an extra set of numbers")
 *  - take off the first digit, then recur
 * Hmmm but that probably wouldn't actually speed up at all because no reuse of solutions.
 * 
 * Or maybe some way of moving from non-balanced numbers to balanced numbers (while increasing) by making strategic
 * changes, swaps of digits. That feels more likely - analyze the number, figure out where it's unbalanced, and figure
 * out what needs to change. That feels more promising!
 * 
 * Do the naive approach first, see if we learn something, then do that
 * 
 * ---
 * 
 * Eh :shrug: this passed the test-cases and didn't time-out in LeetCode. _Could_ probably speed it up with the insights
 * I recognized above, but - YAGNI :P
 */
export function nextBeautifulNumber(n: number): number {
    var next = n+1;
    while (!isBalanced(next)) {
        next++
    }
    return next;
};

export function isBalanced(n: number): boolean {
    const counts: Record<string, number> = {}
    const asString = numToDigitString(n)
    for (let i = 0; i<asString.length; i++) {
        const digit = asString[i];
        const curCount = counts[digit]
        if (curCount == undefined) {
            counts[digit] = 1
        } else {
            counts[digit] = curCount +1;
        }
    }
    
    for (const [key, value] of Object.entries(counts)) {
        if (parseInt(key) != value) {
            return false;
        }
    }
    return true
}

// Possibly some edge-cases to this, would want more careful tests if used in production!
function numToDigitString(n: number): string {
    return n.toString()
}