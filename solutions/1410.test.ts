import { entityParser, matchesSpecialChar } from "./1410"

describe('entityParser', () => {
    it('works', () => {
        expect(entityParser('abc&lt;def&gt;bb')).toEqual('abc<def>bb');
        expect(entityParser('&gt;')).toEqual('>')
        expect(entityParser('abc&not-real&gt;')).toEqual('abc&not-real>');
        expect(entityParser('')).toEqual('');
    })
})

describe('matchesSpecialChar', () => {
    it('works', () => {
        expect(matchesSpecialChar("abc&quot;def", 3)).toEqual({
            length_to_replace: 6,
            replacement: '"'
        })
        expect(matchesSpecialChar("abc&quot;def", 4)).toEqual(null)
        expect(matchesSpecialChar("abc&quot;def", 200)).toEqual(null)
    })
})