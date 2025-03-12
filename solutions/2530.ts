// Naive approach - just go through sequentially picking the highest number each time
function maxKelements(nums: number[], k: number): number {
    let score = 0
    for (let iteration = 0; iteration < k; iteration++) {
        let largest = 0; // Array is positive
        let largest_index = -1;
        for (let i = 0; i < nums.length; i ++) {
            if (nums[i] > largest) {
                largest = nums[i]
                largest_index = i
            }
        }
        score += largest
        nums[largest_index] = Math.ceil(largest / 3)
    }
    return score
};

// The more sophisticated approach will, I think, be to create a maxHeap of size k, and always pop-and-repush the
// biggest number (repushing the divided-by-three value)