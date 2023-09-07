/**
 * Accept 0-9 and dot (.)
 */
export function isNumber(codePoint: number): boolean {
    return ((codePoint >= 48 && codePoint <= 57) || codePoint === 46);
}

/**
 * Accept a-z, A-Z, 0-9 and underscore (_)
 */
export function isIdentifier(codePoint: number): boolean {
    return (codePoint>= 65 && codePoint<= 90)
        || (codePoint>= 97 && codePoint<= 122)
        || codePoint=== 95
        || isNumber(codePoint) && codePoint !== 46;
}