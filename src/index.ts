import { Lexer } from "./lexer/lexer.js";

const code = `
// My comment :p
(1 + 3) * 5;
`;

const lexer = new Lexer(code);
console.log(lexer.analysis());