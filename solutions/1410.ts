// Oh...I feel foolish for over-complicating this, it could have just been:
//
// return text.replace(/&quot;/g, '"').replace(...)
export function entityParser(text: string): string {
    let resp = "";
    let pointer = 0;
    while (pointer < text.length) {
        let second_pointer = pointer;
        while (text[second_pointer] != '&' && second_pointer < text.length) {
            second_pointer++;
        }
        resp += text.slice(pointer, second_pointer);
        if (second_pointer == text.length) {
            break;
        }
        const match = matchesSpecialChar(text, second_pointer)
        if (match != null) {
            resp += match.replacement;
            pointer = second_pointer + match.length_to_replace
        } else {
            resp += text[second_pointer];
            pointer = second_pointer+1;
        }
    }
    return resp;
}

type MatchResponse = {
    length_to_replace: number,
    replacement: string
}

const MATCHES = {
    "quot": '"',
    'apos': "'",
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'frasl': '/',
}

export function matchesSpecialChar(text: string, ptr: number): MatchResponse | null {
    for (let possibleMatch of Object.entries(MATCHES)) {
        // `2` because of the length of `&` and `;`
        const length_to_replace = 2 + possibleMatch[0].length;
        
        if (text.length >= ptr + length_to_replace && text.slice(ptr, ptr + length_to_replace) == "&" + possibleMatch[0] + ";") {
            return {
                length_to_replace,
                replacement: possibleMatch[1]
            }
        }
    }
    return null;
}