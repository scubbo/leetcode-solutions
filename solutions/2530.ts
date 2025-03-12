// Naive approach - just go through sequentially picking the highest number each time (I think the "best" approach would
// be to use a MinHeap, but there's no built-in implementation in TypeScript, so I'll try simpler solutions until/unless
// that performance is unacceptable)
function maxKelementsNaive(nums: number[], k: number): number {
    let score = 0;
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

// Slightly more sophisticated:
// * Descending-Sort the array
// * Take the first value, then reinsert it's lowered value at the appropriate place in the array
function maxKelementsBetter(nums: number[], k: number): number {
    let nums_sorted = nums.sort((a, b) => b - a)
    let score = 0;
    for (let iteration = 0; iteration < k; iteration++) {
        score += nums_sorted[0]
        const lowered_highest = Math.ceil(nums_sorted[0] / 3)
        let idx = 0;
        while (nums_sorted[idx+1] > lowered_highest) {
            nums_sorted[idx] = nums_sorted[idx+1]
            idx++;
        }
        nums_sorted[idx] = lowered_highest
    }
    return score;
}
// Hmm, the approach above _still_ timed out. Guess we're implementing a Min Heap after all!

class MaxHeap {
    data: number[]
    constructor(data: number[] = []) {
        this.data = [...data];
        this.buildHeap()
    }

    buildHeap() {
        for (let i = Math.floor(this.data.length / 2) - 1; i >= 0; i--) {
            this.heapify(i)
        }
    }

    // Turn the sub-tree rooted at index i into a minheap
    heapify(i: number): void {
        const left = i*2+1
        const right = i*2+2
        let largest = i;
        if (this.data[i] < this.data[left]) {
            largest = left
        }
        if (this.data[largest] < this.data[right]) {
            largest = right
        }
        if (largest != i) {
            this.swap(i, largest)
            this.heapify(largest)
        }
    }

    swap(a: number, b: number): void {
        const temp = this.data[b]
        this.data[b] = this.data[a]
        this.data[a] = temp
    }

    popAndRepush(f: (i: number) => number): number {
        const origValue = this.data[0];
        this.data[0] = f(origValue)
        this.heapify(0)
        return origValue
    }
}

function maxKelements(nums: number[], k: number): number {
    const heap = new MaxHeap(nums)
    let score = 0;
    for (let iteration = 0; iteration < k; iteration++) {
        score += heap.popAndRepush((i) => Math.ceil(i/3))
    }
    return score
}

if (maxKelements([1, 10, 3, 3, 3], 3) != 17) {
    throw new Error("failed!")
} else {
    console.log("Passed")
}
