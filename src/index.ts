import { Lexer } from "./lexer/lexer.js";

const code = `
int num1 = readln\<int\>("Digite um número: ");
println("Você escreveu \${num1}");
`;

const lexer = new Lexer(code);
console.log(lexer.analysis());