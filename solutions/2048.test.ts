import { isBalanced, nextBeautifulNumber } from "./2048"

describe('nextBeautifulNumber', () => {
    it('works', () => {
        expect(nextBeautifulNumber(1)).toEqual(22);
        expect(nextBeautifulNumber(1000)).toEqual(1333)
    })
})

describe('isBalanced', () => {
    it('works', () => {
        expect(isBalanced(22)).toBe(true);
        expect(isBalanced(1)).toBe(true);
        expect(isBalanced(122)).toBe(true)
        expect(isBalanced(212)).toBe(true)

        expect(isBalanced(12)).toBe(false)
        expect(isBalanced(1223)).toBe(false)
        expect(isBalanced(5)).toBe(false)
    })
})