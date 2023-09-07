export enum Tokens {
    TK_SINGLE_COMMENT,    // single line comment (//)
    TK_MULTILINE_COMMENT, // multi line comment (/* */)
    TK_IDENTIFIER,        // identifier (someId)
    TK_KEYWORD,           // keyword (SomeKeyword)
    TK_STRING,            // string ("something")
    TK_SUBTRACTION,       // subtraction (-)
    TK_ADDITION,          // addition (+)
    TK_MULTIPLICATION,    // multiplication (*)
    TK_DIVISION,          // division (/)
    TK_INTEGER,           // integer (0-9)
    TK_FLOAT,             // float (0-9, .)
    TK_POWER,             // power (^)
    TK_LEFT_PAREN,        // left parenthesis ( ( )
    TK_RIGHT_PAREN,       // right parenthesis ( ) )
    TK_NEWLINE,           // newline (\n)
    TK_BINARY_OP,         // binary operation (X OP Y)
    TK_UNARY_OP,          // unary operation (OP X)
    TK_EOF,               // end of file
    TK_ASSIGN,            // assign (=)
    TK_LESSER,            // lesser sign (<)
    TK_GREATER,           // greater sign (>)
    TK_SEMICOLON,         // semicolon (;)
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