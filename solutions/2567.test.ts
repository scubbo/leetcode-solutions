import { minimizeSum } from "./2567"

describe('minimizeSum', () => {
    it('works', () => {
        expect(minimizeSum([1,4,7,8,5])).toEqual(3);
        expect(minimizeSum([59,27,9,81,33])).toEqual(24);
        expect(minimizeSum([58,42,8,75,28])).toEqual(30);
    })
})