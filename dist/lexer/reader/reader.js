import { Token, Tokens } from "../tokens.js";
export class Reader {
    lexer;
    constructor(lexer) {
        this.lexer = lexer;
    }
    skipWhiteSpace() {
        while (this.lexer.cursor.character.match(/\s/)) {
            this.lexer.next();
        }
    }
    readSingleComment() {
        const startPos = this.lexer.position.index;
        this.lexer.next();
        let text = "";
        while (this.lexer.cursor.characterCode !== 10 && this.lexer.next()) {
            text += this.lexer.cursor.character;
        }
        return new Token(Tokens.TK_SINGLE_COMMENT, text, startPos, this.lexer.position.index);
    }
    readNumber() {
        const startPos = this.lexer.position.index;
        let number = this.lexer.cursor.character;
        while (this.lexer.next() && ((this.lexer.cursor.characterCode >= 48 && this.lexer.cursor.characterCode <= 57) || this.lexer.cursor.character === '.')) {
            number += this.lexer.cursor.character;
        }
        return new Token(number.includes(".")
            ? Tokens.TK_FLOAT
            : Tokens.TK_INTEGER, number, startPos, this.lexer.position.index);
    }
}
