export var Tokens;
(function (Tokens) {
    Tokens[Tokens["TK_SINGLE_COMMENT"] = 0] = "TK_SINGLE_COMMENT";
    Tokens[Tokens["TK_SUBTRACTION"] = 1] = "TK_SUBTRACTION";
    Tokens[Tokens["TK_ADDITION"] = 2] = "TK_ADDITION";
    Tokens[Tokens["TK_MULTIPLICATION"] = 3] = "TK_MULTIPLICATION";
    Tokens[Tokens["TK_DIVISION"] = 4] = "TK_DIVISION";
    Tokens[Tokens["TK_INTEGER"] = 5] = "TK_INTEGER";
    Tokens[Tokens["TK_FLOAT"] = 6] = "TK_FLOAT";
    Tokens[Tokens["TK_NUMBER"] = 7] = "TK_NUMBER";
    Tokens[Tokens["TK_POWER"] = 8] = "TK_POWER";
    Tokens[Tokens["TK_LEFT_PAREN"] = 9] = "TK_LEFT_PAREN";
    Tokens[Tokens["TK_RIGHT_PAREN"] = 10] = "TK_RIGHT_PAREN";
    Tokens[Tokens["TK_NEWLINE"] = 11] = "TK_NEWLINE";
    Tokens[Tokens["TK_BINARY_OP"] = 12] = "TK_BINARY_OP";
    Tokens[Tokens["TK_UNARY_OP"] = 13] = "TK_UNARY_OP";
    Tokens[Tokens["TK_EOF"] = 14] = "TK_EOF"; // end of file
})(Tokens || (Tokens = {}));
export class Token {
    type;
    value;
    startPosition;
    endPosition;
    constructor(type, value, startPosition, endPosition) {
        this.type = type;
        this.value = value;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }
}
