// First attempt will just do it naively, without taking advantage of the non-decreasing nature of the array.
function maximumCountNaive(nums: number[]): number {
    let countPos = 0
    let countNeg = 0
    nums.forEach((i) => {
        if (i > 0) {
            countPos += 1
        }
        if (i < 0) {
            countNeg += 1
        }
    })
    return Math.max(countPos, countNeg)
}

// Smarter attempt
function maximumCount(nums: number[]): number {
    let idx = 0
    while (nums[idx] < 0) {
        idx += 1
        if (idx == nums.length) {
            break
        }
    }
    const countNeg = idx
    let countPos: number
    if (idx == nums.length) {
        countPos = 0
    } else {
        while (nums[idx] == 0) {
            idx += 1
            if (idx == nums.length) {
                break
            }
        }
        countPos = nums.length - idx
    }

    return Math.max(countNeg, countPos);
}