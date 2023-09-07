import { Lexer } from "../lexer.js";
import { Token, Tokens } from "../tokens.js";
import { isIdentifier, isNumber } from "../util.js";

export class Reader {
    private lexer: Lexer;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
    }

    skipWhiteSpace() {
        while (this.lexer.cursor.character.match(/\s/)) {
            this.lexer.next();
        }
    }

    readSingleComment(): Token {
        const startPos = this.lexer.position.index;

        this.lexer.next();

        let text = "";
        while (this.lexer.cursor.characterCode !== 10 && this.lexer.next()) {
            text += this.lexer.cursor.character;
        }
        
        return new Token(Tokens.TK_SINGLE_COMMENT, text, startPos, this.lexer.position.index);
    }

    readNumber(): Token {
        const startPos = this.lexer.position.index;
        
        let number = this.lexer.cursor.character;

        while (this.lexer.next() && isNumber(this.lexer.cursor.characterCode)) {
            number += this.lexer.cursor.character;
        }

        return new Token(
            number.includes(".")
            ? Tokens.TK_FLOAT
            : Tokens.TK_INTEGER,
            number,
            startPos,
            this.lexer.position.index
        );
    }

    readIdentifier(): Token {
        const startPos = this.lexer.position.index;

        let idk = this.lexer.cursor.character;

        while (isIdentifier(this.lexer.getNextCode()) && this.lexer.next()) {
            idk += this.lexer.cursor.character;
        }

        return new Token(Tokens.TK_IDENTIFIER, idk, startPos, this.lexer.position.index);
    }

    readString(): Token {
        const startPos = this.lexer.position.index;
        const delimiter = this.lexer.cursor.characterCode;
        const startLine = this.lexer.position.line;

        let text = "";

        while (this.lexer.next() && this.lexer.cursor.characterCode !== delimiter) {
            if (startLine !== this.lexer.position.line) {
                throw new SyntaxError(`A string (${text}) on line ${startLine} was not closed before the end of the line.`);
            }

            text += this.lexer.cursor.character;
        }

        return new Token(Tokens.TK_STRING, text, startPos, this.lexer.position.index);
    }
}