import { ListNode, reorderList, unpack } from "./143"

describe('reorderList', () => {
    it('works', () => {
        doTest([1,2,3,4,5], [1,5,2,4,3])
        doTest([1,2,3,4], [1,4,2,3])
    })
})

function doTest(arrayIn: number[], expected: number[]): void {
    const headNode = nodesFromArray(arrayIn);
    reorderList(headNode)
    expect(unpack(headNode)).toEqual(expected);
}

function nodesFromArray(ns: number[]): ListNode {
    if (ns.length == 0) {
        throw new Error("Must have non-empty array")
    }
    const headNode = new ListNode(ns[0]);
    var cur = headNode
    for (let i = 1; i<ns.length; i++) {
        const newNode = new ListNode(ns[i])
        cur.next = newNode
        cur = newNode;
    }
    return headNode;
}
