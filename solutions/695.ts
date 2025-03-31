export function maxAreaOfIsland(grid: number[][]): number {
    let maxSize = 0;
    for (let i = 0; i<grid.length; i++) {
        for (let j = 0; j<grid[0].length; j++) {
            maxSize = Math.max(maxSize, areaOfIslandStartingAt(grid, i, j));
        }
    }
    return maxSize;
};

export function areaOfIslandStartingAt(grid: number[][], i: number, j: number): number {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) {
        return 0;
    }
    console.log(`Checking grid at ${i}, ${j}`)
    if (grid[i][j] == 0) {
        return 0;
    } else {
        grid[i][j] = 0; // So we don't get stuck in infinite loop
        return 1 + areaOfIslandStartingAt(grid, i+1, j) + areaOfIslandStartingAt(grid, i-1, j) + areaOfIslandStartingAt(grid, i, j-1) + areaOfIslandStartingAt(grid, i, j+1);
    }
}