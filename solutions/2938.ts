/**
  * There are n balls on a table, each ball has a color black or white.
  * 
  * You are given a 0-indexed binary string s of length n, where 1 and 0 represent black and white balls, respectively.
  *
  * In each step, you can choose two adjacent balls and swap them.
  *
  * Return the minimum number of steps to group all the black balls to the right and all the white balls to the left.
 */

// Approach:
// * Starting from the left, move right until we find the first black ball. Leave pointer `i` here.
// * Continue iterating a second pointer `j` until finding the first white ball.
//   * If `j` iterates off the end of the array, we're done
// * Continue iterating a third pointer `k` until finding the next black ball, or until the end of the array
// * Move the chunk of white balls in `j<->k` to the left of the block of black balls in `i<->j`. This will take
//    `(k-j)*(j-i)` swap-operations (each of the white balls will have to swap past each of the black balls).
// * If `k` is at the end of the array, we're done. Else:
//   * Move `i` to `i+(k-j)`
//   * Start again from the start.
function minimumSteps(s: string): number {
    // If you want to visualize, you need to actually rearrange the "string" - which requires creating a new array
    // let s_arr = s.split('');
    // Replace all instances of `s` with `s_arr` below
    let i = 0;
    while (s[i] == '0') {i++;}
    let j = i
    let swaps = 0;
    mainloop: while (true) {   
        // console.log(`String is: ${s_arr}`)
        while (s[j] == '1') {
            j++
            if (j == s.length) {
                // I.e. if "the chunk of black balls" that we are iterating over extends to the right edge of the array
                // (Could just do `return swaps`, I guess :shrug:)
                break mainloop;
            }
        }
        let k = j;
        while (s[k] == '0' && k < s.length) {
            k++
        }
        // console.log(`Found values ${i}, ${j}, and ${k}`)
        
        // Swap the chunks
        // This next part isn't actually part of the solution, but it's nice for visualization!
        // for (let white_index = i; white_index < j; white_index++) {
        //     // Don't technically need to do this as the solution doesn't care about the array actually _being_
        //     // rearranged, but might as well - just makes it easier to think about, and visualize!
        //     // The more-efficient solution would probably just move `j` on to where `k` is.
        //     s_arr[white_index] = '0';
        // }
        // for (let black_index = j; black_index < k; black_index++) {
        //     s_arr[black_index] = '1';
        // }
        swaps += (k-j) * (j-i);
        if (k == s.length) {
            break mainloop;
        } else {
            i = i + (k - j)
            j = k
        }
        // console.log(`Moved i on to ${i}`)

    }
    // console.log(`Solution is ${swaps}`)
    return swaps;
}

console.log(minimumSteps('01010001'))