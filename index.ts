// A small lisp interpreter
// Given an input ```(5 + 5)```
// Then the output need to be ```10```
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import Scanner from './Scanner';
import Parser from './Parser';
import AstPrinter from './AstPrinter';
import TokenType from './TokenType';

const args = process.argv.slice(2);

let hadError = false;

(async function () {
  if (args.length > 1) {
    console.log('Usage: tslisp [script]');
    process.exit(64);
  } else if (args.length === 1) {
    runFile(args[0]);
  } else {
    await runPrompt();
  }
}());

function runFile(filePath) {
  const data = fs.readFileSync(path.join(process.cwd(), filePath), 'utf-8');
  run(data);
  if (hadError) process.exit(65);
}

async function runPrompt() {
  const question = (prompt) => {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(prompt, (line) => {
        rl.close();
        resolve(line);
      });
    });
  };

  for (;;) {
    const line = await question('> ');
    if (line === null) break;
    run(line);
    hadError = false;
  }
}

function run(source) {
  const scanner = new Scanner(source);
  const tokens = scanner.scanTokens();
  const parser = new Parser(tokens);
  const expression = parser.parse();

  console.log(new AstPrinter().print(expression));
}

export function error(token, message) {
  if (token.type === TokenType.EOF) {
    report(token.lien, ' at end', message);
  } else {
    report(token.line, ` at \'${token.lexeme}\'`, message);
  }
}

function report(line, where, message) {
  console.error(`[line ${line}] Error ${where}: ${message}`);
  hadError = true;
}
