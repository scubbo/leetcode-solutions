// First attempt will just do it naively, without taking advantage of the non-decreasing nature of the array.
function maximumCount(nums: number[]): number {
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