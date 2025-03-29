export function reverse(x: number): number {
    if (x == 0) {
        return 0;
    }

    const isNegative = x < 0;
    if (isNegative) {
        x = -x;
    }
    const digits = digitsOfNumber(x)
    const numDigits = digits.length;
    let response = digits[numDigits-1];
    for (let i = numDigits-2; i>=0; i--) {
        response *= 10;
        response += digits[i];
    }

    if (response > (Math.pow(2, 31) - 1)) {
        return 0;
    }

    if (isNegative) {
        return -response;
    } else {
        return response;
    }
}

export function digitsOfNumber(x: number): number[] {
    const numDigits = Math.floor(Math.log10(x)) + 1
    const response: number[] = [];
    for (let i = numDigits; i>0; i--) {
        const truncated = Math.floor(x / Math.pow(10, i-1))
        response.push(truncated % 10)
    }
    return response;
}

