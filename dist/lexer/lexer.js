import { Reader } from "./reader/reader.js";
import { Token, Tokens } from "./tokens.js";
export class Lexer {
    input;
    position;
    cursor;
    constructor(input) {
        this.input = input;
        this.position = {
            index: -1,
            column: -1,
            line: 1
        };
        this.cursor = {
            character: "",
            characterCode: -1
        };
    }
    next() {
        this.position.index++;
        this.position.column++;
        this.cursor.character = this.input.charAt(this.position.index);
        this.cursor.characterCode = this.cursor.character.codePointAt(0) ?? -1;
        // is new line?
        if (this.cursor.characterCode === 10) {
            this.position.column = 0;
            this.position.line++;
        }
        return this.position.index < this.input.length;
    }
    checkNext(character) {
        return this.input.charAt(this.position.index + 1) === character;
    }
    analysis() {
        const reader = new Reader(this);
        const tokens = [];
        while (this.next()) {
            reader.skipWhiteSpace();
            switch (this.cursor.character) {
                case '+':
                    tokens.push(new Token(Tokens.TK_ADDITION, this.cursor.character, this.position.index, this.position.index));
                    break;
                case '-':
                    tokens.push(new Token(Tokens.TK_SUBTRACTION, this.cursor.character, this.position.index, this.position.index));
                    break;
                case '*':
                    tokens.push(new Token(Tokens.TK_MULTIPLICATION, this.cursor.character, this.position.index, this.position.index));
                    break;
                case '/':
                    if (this.checkNext('/')) {
                        tokens.push(reader.readSingleComment());
                        break;
                    }
                    else {
                        tokens.push(new Token(Tokens.TK_DIVISION, this.cursor.character, this.position.index, this.position.index));
                        break;
                    }
                case '^':
                    tokens.push(new Token(Tokens.TK_POWER, this.cursor.character, this.position.index, this.position.index));
                    break;
                case '(':
                    tokens.push(new Token(Tokens.TK_LEFT_PAREN, this.cursor.character, this.position.index, this.position.index));
                    break;
                case ')':
                    tokens.push(new Token(Tokens.TK_RIGHT_PAREN, this.cursor.character, this.position.index, this.position.index));
                    break;
                case '\\n':
                    tokens.push(new Token(Tokens.TK_NEWLINE, this.cursor.character, this.position.index, this.position.index));
                    break;
                default:
                    if (this.cursor.characterCode >= 48 && this.cursor.characterCode <= 57) {
                        tokens.push(reader.readNumber());
                    }
                    else if (this.cursor.characterCode !== -1) {
                        throw new SyntaxError(`Invalid character '${this.cursor.character}' at ${this.position.line}:${this.position.column}`);
                    }
            }
        }
        tokens.push(new Token(Tokens.TK_EOF, "EOF", this.position.index, this.position.index));
        return tokens;
    }
}
