/**
 * 
 Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 */

export function numIslands(grid: string[][]): number {
    var count = 0;
    for (let i = 0; i<grid.length; i++) {
        for (let j = 0; j<grid[0].length; j++) {
            if (grid[i][j] == "1") {
                count++
                explore(grid, i, j)
            }
        }
    }
    return count
};

function explore(grid: string[][], i: number, j: number) {
    if (grid[i][j] == "0") {
        return;
    }
    grid[i][j] = "0";
    if (i > 0) {
        explore(grid, i-1, j);
    }
    if (j > 0) {
        explore(grid, i, j-1);
    }
    if (i < grid.length-1) {
        explore(grid, i+1, j);
    }
    if (j < grid[0].length-1) {
        explore(grid, i, j+1);
    }
}