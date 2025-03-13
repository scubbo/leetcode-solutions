/**
 * You are given an integer array nums of length n and a 2D array queries where queries[i] = [li, ri, vali].
 *
 * Each queries[i] represents the following action on nums:
 *    Decrement the value at each index in the range [li, ri] in nums by at most vali.
 *    The amount by which each value is decremented can be chosen independently for each index.
 *
 * A Zero Array is an array with all its elements equal to 0.
 *
 * Return the minimum possible non-negative value of k, such that after processing the first k queries in sequence, nums becomes a Zero Array. If no such k exists, return -1.
 */

// Thinking out loud here - _no_ idea how to do this in a way that's more-efficient than the naive approach of Just Doing
// It. I _guess_ you could shortcut your way to _some_ solutions by:
// * If no query overlaps a given index (with non-zero value), then the solution is `-1`.
// * If the sum of `val` for all queries that overlap a given slot is less than the original total, solution is `-1`.
//
// But none of that really suggests a general solution.
// I _guess_ a small optimization would be "we only need to check for a zero-array after carrying out a query that
// brings a value _to_ 0", but that's gonna be...a small improvement, I would have thought?
//
// Let's just try it, and see if we figure something out.

process.env.DEBUG = 'TRUE'

function minZeroArrayFirstAttempt(nums: number[], queries: number[][]): number {
    if (isZeroArray(nums)) {
        return 0;
    }

    // Check for some degenerate cases...this _feels_ pointless, but there are Leetcode test-cases specifically for it,
    // (like - `queries` that are all identical but that don't hit the last value)
    // so...:shrug:

    const isTouchedArray = [...Array(nums.length).keys()].map((_) => false)
    for (let qi = 0; qi < queries.length; qi) {
        const query = queries[qi];
        const li = query[0];
        const ri = query[1];
        for (let ii = li; ii<=ri; ii++) {
            isTouchedArray[ii] = true
        }
    }
    if (!(isTouchedArray.reduce((a, b) => (a && b)))) {
        return -1;
    }

    for (let qi = 0; qi < queries.length; qi++) {
        const query = queries[qi];
        log(`Operating on query ${qi}: ${query}`)
        const li = query[0];
        const ri = query[1];
        const vali = query[2];
        let checkForZeroArray = false;
        for (let ii = li; ii<=ri; ii++) {
            if (nums[ii] > vali) {
                log(`Reducing value ${nums[ii]} (at index ${ii}) by ${vali}`)
                nums[ii] -= vali;
                continue
            }
            if (nums[ii] != 0) {
                nums[ii] = 0;
                checkForZeroArray = true;
            }
        }
        if (checkForZeroArray) {
            if (isZeroArray(nums)) {
                return qi+1; // "After processing the first k queries"
            }
        }
        log(`After query ${qi}, nums is ${nums}`)
    }
    return -1;
};

function isZeroArray(nums: number[]): boolean {
    for (let i = 0; i<nums.length; i++) {
        if (nums[i] != 0) {
            return false
        }
    }
    return true;
}

function log(s: string): void {
    if (process.env.DEBUG == 'TRUE') {
        console.log(s);
    }
}

// ============
// OK, that didn't work - a very large array timed-out.
// Let's try reversing this - instead of applying each query against the array, let's try processing _for each index
// in the input array_. Should be a similar approach, but finding non-solutions faster:
// * For each index in the array:
//   * Iterate through all the queries. If the query applies to this index:
//     * decrement the value by that amount
//     * if that brings the value to zero, this is the k-value _for that index_
//   * If the iteration continues without the value reaching zero, the response for the algorithm is `-1`
// * Once all indices have been handled, return the largest k-value.
function minZeroArrayFasterButStillTooSlow(nums: number[], queries: number[][]): number {
    if (isZeroArray(nums)) {
        return 0;
    }

    let largestKValue = 0;
    for (let i=0; i<nums.length; i++) {
        log(`Operating on index ${i}, value ${nums[i]}`)
        let val = nums[i];
        if (val == 0) {
            continue;
        }
        let reachedZero = false;
        for (let qi=0; qi<queries.length; qi++) {
            log(`Using query index ${qi}, value ${queries[qi]}`)
            if (queries[qi][0]<=i && i<=queries[qi][1]) {
                log(`Query applies`)
                val -= queries[qi][2];
                log(`After applying query, value is ${val}`)
                if (val <= 0) {
                    largestKValue = Math.max(largestKValue, qi+1);
                    reachedZero = true;
                    break;
                }
            }
        }
        if (!reachedZero) {
            return -1;
        }
    }
    return largestKValue;
}

// ...That didn't work either. At this point I gave up and looked at a solution, which introduced me to the idea of a
// "Difference Array", which I'd never encountered before. New Data Structure to learn, let's goooo!
function minZeroArray(nums: number[], queries: number[][]): number {
    if (!(canFormZeroArrayWithKOperations(nums, queries, queries.length))) {
        return -1
    }
    // Binary search for k within `[0, queries.length]`.
    let left = 0;
    let right = queries.length;
    while (left <= right) {
        const mid = left + Math.floor((right - left)/2)
        if (canFormZeroArrayWithKOperations(nums, queries, mid)) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

function canFormZeroArrayWithKOperations(nums: number[], queries: number[][], k: number): boolean {
    log(`Checking if can form zero array with ${k} operations`)
    const n = nums.length
    let diffArray = [...Array(n+1).keys()].map((_) => 0);
    for (let qi=0; qi<k; qi++) {
        const qVal = queries[qi][2];
        diffArray[queries[qi][0]] += qVal;
        diffArray[queries[qi][1]+1] -= qVal;
    }
    log(`Difference array is ${diffArray}`)

    // Constructed the Difference Array - now check if every value has been zero'd out by those operations.
    let prefixSum = 0;
    for (let i=0; i<nums.length; i++) {
        prefixSum += diffArray[i]
        if (prefixSum < nums[i]) {
            return false;
        }
    }
    return true;
}
// Whoof - never would have got that one without a hint!


// 2
// console.log(minZeroArray([2, 0, 2], [[0, 2, 1], [0, 2, 1], [1, 1, 3]]))

// 0
// console.log(minZeroArray([0], [[0,0,2],[0,0,4],[0,0,4],[0,0,3],[0,0,5]]))

// 3
// console.log(minZeroArray([0,4,3], [[2,2,1],[2,2,3],[1,2,5],[0,1,2],[1,2,3],[0,1,3],[2,2,3],[1,1,3],[0,2,5],[0,2,4],[0,1,3],[0,2,5],[0,1,2],[2,2,2],[1,1,4]]))

