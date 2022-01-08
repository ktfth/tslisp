interface IToken {
  type: string;
  lexeme: string;
  literal: string;
  line: number;
}

export default class Token implements IToken {
  type = '';
  lexeme = '';
  literal = '';
  line = 0;

  constructor(type, lexeme, literal, line) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  toString() {
    return `${this.type} ${this.lexeme} ${this.literal}`;
  }
}
