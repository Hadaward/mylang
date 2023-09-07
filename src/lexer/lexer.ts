import { Reader } from "./reader/reader.js";
import { Token, Tokens } from "./tokens.js";
import { isIdentifier, isNumber } from "./util.js";

export class Lexer {
    private input: string;
    public position: {
        index: number;
        column: number;
        line:  number;
    };
    public cursor: {
        character: string;
        characterCode: number;
    }

    constructor(input: string) {
        this.input = input;
        this.position = {
            index: -1,
            column: -1,
            line: 1
        }
        this.cursor = {
            character: "",
            characterCode: -1
        }
    }

    next(): boolean {
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

    checkNext(character: string): boolean {
        return this.input.charAt(this.position.index + 1) === character;
    }

    getNextCode(): number {
        return this.input.charCodeAt(this.position.index + 1);
    }

    analysis(): Array<Token> {
        const reader = new Reader(this);
        const tokens: Array<Token> = [];

        while(this.next()) {
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
                    } else {
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
                case '=':
                    tokens.push(new Token(Tokens.TK_ASSIGN, this.cursor.character, this.position.index, this.position.index));
                    break;
                case '<':
                    console.log('lesser?');
                    tokens.push(new Token(Tokens.TK_LESSER, this.cursor.character, this.position.index, this.position.index));
                    break;
                case '>':
                    tokens.push(new Token(Tokens.TK_GREATER, this.cursor.character, this.position.index, this.position.index));
                    break;
                case ';':
                    tokens.push(new Token(Tokens.TK_SEMICOLON, this.cursor.character, this.position.index, this.position.index));
                    break;
                default:
                    if (['"', "'"].includes(this.cursor.character)) {
                        tokens.push(reader.readString());
                    } else if (isIdentifier(this.cursor.characterCode)) {
                        tokens.push(reader.readIdentifier());
                    } else if (isNumber(this.cursor.characterCode)) {
                        tokens.push(reader.readNumber());
                    } else if (this.cursor.characterCode !== -1) {
                        throw new SyntaxError(`Invalid character '${this.cursor.character}' at ${this.position.line}:${this.position.column}`);
                    }

            }
        }

        tokens.push(new Token(Tokens.TK_EOF, "EOF", this.position.index, this.position.index));

        return tokens;
    }
}