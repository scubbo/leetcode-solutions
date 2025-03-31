/**
 * Given the root of a binary search tree and the lowest and highest boundaries as low and high, trim the tree so that all its elements lies in [low, high]. Trimming the tree should not change the relative structure of the elements that will remain in the tree (i.e., any node's descendant should remain a descendant). It can be proven that there is a unique answer.

Return the root of the trimmed binary search tree. Note that the root may change depending on the given bounds.
 */

// Didn't bother with test-cases for this because, honestly, the effort of writing a translator to/from Array<->BST
// would be more trouble than that's worth - I know that my upcoming interview is a more practical question, less about
// LeetCode-y style.


class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
    if (root == null) {
        return root;
    }
    // Process the root node directly because we need to keep a reference to it.
    var returnRoot: TreeNode | null;
    if (root.val < low) {
        returnRoot = findHighestLegalNodeInSubtree(root.right, low, high);
    } else if (root.val > high) {
        returnRoot = findHighestLegalNodeInSubtree(root.left, low, high);
    } else {
        returnRoot = root;
    }
    processChildren(returnRoot, low, high);
    
    return returnRoot;
}

function processChildren(node: TreeNode | null, low: number, high: number): void {
    if (node == null) {
        return;
    }
    // For each of the children, check that its value is legal.
    if (node.left != null) {
        // If it is not, replace it with the first legal node in its subtree
        if (!(node.left.val >= low && node.left.val <= high)) {
            node.left = findHighestLegalNodeInSubtree(node.left, low, high)
        }
        // Continue processing down the left subtree
        processChildren(node.left, low, high)
    }
    // Same for right child
    if (node.right != null) {
        // If it is not, replace it with the first legal node in its subtree
        if (!(node.right.val >= low && node.right.val <= high)) {
            node.right = findHighestLegalNodeInSubtree(node.right, low, high)
        }
        // Continue processing down the left subtree
        processChildren(node.right, low, high)
    }
    
}

function findHighestLegalNodeInSubtree(node: TreeNode | null, low: number, high: number): TreeNode | null {
    if (node == null) {
        return null;
    }
    if (node.val >= low && node.val <= high) {
        return node;
    }
    if (node.val < low) {
        return findHighestLegalNodeInSubtree(node.right, low, high);
    }
    if (node.val > high) {
        return findHighestLegalNodeInSubtree(node.left, low, high);
    }
    throw new Error("Impossible situation");
}