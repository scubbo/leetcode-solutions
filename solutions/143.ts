/**
 * You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln

Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

You may not modify the values in the list's nodes. Only nodes themselves may be changed.
 */

export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

// Do not return anything, modify head in-place instead
// First thought - push the nodes onto a Stack, pop 'em off one-by-one and insert them.
// Termination condition - insert only up to after the `floor(length / 2)`-th item, and preserve a forward-linking node
// after that if `length % 2 == 1`
// (Make sure to check that with test-cases!)
export function reorderList(head: ListNode | null): void {
    if (head == null) {
        return;
    }
    const stack: number[] = []
    var cur: ListNode | null = head;
    var length = 0
    while (cur != null) {
        stack.push(cur.val)
        cur = cur.next
        length++
    }

    // Start iteration again - could reuse `cur` by reinitializing, but that's a recipe for bugs, so create a new var
    var new_cur = head;
    for (let ignored_counter=0; ignored_counter<(length/2)-1; ignored_counter++) {
        const orig_next = new_cur.next
        // A probably-more-performant approach would be to store the actual ListNodes in the stack and pop them directly,
        // but TypeScript gives me an error when trying to do so
        new_cur.next = new ListNode(stack.pop(), orig_next)
        new_cur = orig_next!
        
    }
    if (length % 2 == 1) {
        new_cur.next=null
    } else {
        new_cur.next!.next = null
    }

}

// Should really be in `.test.ts`, but putting it here because it's useful in debugging logs
export function unpack(head: ListNode): number[] {
    const resp: number[] = [];
    var cur: ListNode | null = head
    while (cur != null) {
        resp.push(cur.val);
        cur = cur.next;
    }
    return resp;
}