import { reverse, digitsOfNumber } from "./7";

describe('reverse', () => {
    it('works', () => {
        expect(reverse(123)).toEqual(321);
        expect(reverse(100)).toEqual(1);
        expect(reverse(1)).toEqual(1);
        expect(reverse(200)).toEqual(2);
        expect(reverse(Math.pow(2, 32))).toEqual(0);
        expect(reverse(-231)).toEqual(-132);
    })
})

describe('digits', () => {
    it('works', () => {
        expect(digitsOfNumber(123)).toEqual([1, 2, 3])
        expect(digitsOfNumber(1)).toEqual([1])
        expect(digitsOfNumber(3)).toEqual([3])
        expect(digitsOfNumber(10)).toEqual([1,0])
    })
});