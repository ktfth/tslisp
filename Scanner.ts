import TokenType from './TokenType';
import Token from './Token';

interface IScanner {
  source: string;
  tokens: Array<Token>;
  start: number;
  current: number;
  line: number;
}

export default class Scanner implements IScanner {
  source = '';
  tokens = [];
  start = 0;
  current = 0;
  line = 0;

  constructor(source) {
    this.source = source;
  }

  scanTokens() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, '', null, this.line));

    return this.tokens;
  }

  isAtEnd() {
    return this.current >= this.source.length;
  }

  scanToken() {
    const c = this.advance();
    switch (c) {
      case '('.charCodeAt(0): this.addToken(TokenType.LEFT_PAREN); break;
      case ')'.charCodeAt(0): this.addToken(TokenType.RIGHT_PAREN); break;
      case '+'.charCodeAt(0): this.addToken(TokenType.PLUS); break;
      case ' '.charCodeAt(0): break;
      default:
        if (this.isDigit(c)) {
          this.number();
        } else {
          throw new Error('Unexpected character.');
        }
        break;
    }
  }

  advance() {
    return this.source.charCodeAt(this.current++);
  }

  addToken(type, literal = null) {
    this._addToken(type, literal);
  }

  _addToken(type, literal) {
    const text = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(type, text, literal, this.line));
  }

  isDigit(c) {
    return c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0);
  }

  number() {
    this.addToken(TokenType.NUMBER,
      parseInt(this.source.substring(this.start, this.current), 10));
  }

  peek() {
    if (this.isAtEnd()) return '\0'.charCodeAt(0);
    return this.source.charCodeAt(this.current);
  }
}
