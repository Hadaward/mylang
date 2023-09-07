export enum Tokens {
    TK_SINGLE_COMMENT,  // comment
    TK_SUBTRACTION,     // subtraction
    TK_ADDITION,        // addition
    TK_MULTIPLICATION,  // multiplication
    TK_DIVISION,        // division
    TK_INTEGER,         // integer
    TK_FLOAT,           // float
    TK_NUMBER,          // number
    TK_POWER,           // power
    TK_LEFT_PAREN,      // left parenthesis
    TK_RIGHT_PAREN,     // right parenthesis
    TK_NEWLINE,         // newline
    TK_BINARY_OP,       // binary operation
    TK_UNARY_OP,        // unary operation
    TK_EOF              // end of file
}

export class Token {
    type: Tokens;
    value: string;
    startPosition: number;
    endPosition: number;

    constructor(type: Tokens, value: string, startPosition: number, endPosition: number) {
        this.type = type;
        this.value = value;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }
}