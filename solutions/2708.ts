/**
 * You are given a 0-indexed integer array nums representing the score of students in an exam. The teacher would like to form one non-empty group of students with maximal strength, where the strength of a group of students of indices i0, i1, i2, ... , ik is defined as nums[i0] * nums[i1] * nums[i2] * ... * nums[ik​].
 * 
 * Return the maximum strength of a group the teacher can create.
 */

// Logic:
// * Exclude every student with score 0
// * All other students can contribute
// * Must have an even number of negative numbers, so:
//   * Keep track of the smallest negative number encountered so far
//   * At the end, if the total is negative, divide by the smallest negative number (which will hopefully be `-1` so as
//       to not affect the score, but that doesn't actually affect our logic. Might do for extension questions, though!)
//   * Also keep track of if any positive numbers have been encountered - to account for degenerate cases like `[0, -1]`
function maxStrength(nums: number[]): number {
    if (nums.length == 1) {
        // Non-empty group => we have to use it!
        return nums[0];
    }
    let smallestNegativeNumber = -10; // Should really be `-Infinity`, but we have guarantees on the constraints.
    let total = 1;
    let haveSeenPositiveNumbers = false;
    let numberOfNegativeNumbersSeen = 0;
    for (let i = 0; i<nums.length; i++) {
        const num = nums[i];
        console.log(`Processing ${num}`)

        if (num == 0) {
            continue
        }
        
        if (num < 0) {
            numberOfNegativeNumbersSeen++;
            console.log(`NumberOfNegativeNumbersSeen is now ${numberOfNegativeNumbersSeen}`)
            if (num > smallestNegativeNumber) {
                smallestNegativeNumber = num;
            }
        }

        if (num > 0) {
            haveSeenPositiveNumbers = true;
        }

        total *= num
        console.log(`Total is now ${total}, after multiplying by ${num}`)
    }
    if (numberOfNegativeNumbersSeen == 0 && !haveSeenPositiveNumbers) {
        // Array is all zeros - but we cannot return the default `1` (which was necessary because it's the
        // multiplicative identity)
        return 0
    }
    if (total < 0) {
        if (haveSeenPositiveNumbers || numberOfNegativeNumbersSeen > 1) {
            console.log(`Total is less than zero, so dividing by ${smallestNegativeNumber}`)
            total /= smallestNegativeNumber;
        } else {
            console.log(`Encountered no positive numbers and only a single negative number - returning 0`)
            total = 0;
        }
        
    }
    console.log(`Returning ${total}`)
    return total;
}

// Whoof, this was _messy_. Lots of edge cases! Didn't enjoy that.
