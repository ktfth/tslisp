import TokenType from './TokenType';
import {
  Binary,
  // Unary,
  Literal,
  Grouping,
} from './Expr';
import * as Lisp from './index';

class ParserError extends Error {}

export default class Parser {
  current = 0;
  tokens = [];

  constructor(tokens) {
    this.current = 0;
    this.tokens = tokens;
  }

  parse() {
    try {
      return this.expression();
    } catch (error) {
      return null;
    }
  }

  expression() {
    return this.term();
  }

  term() {
    return this.factor();
  }

  factor() {
    return this.unary();
  }

  unary() {
    return this.primary();
  }

  primary() {
    if (this.match(TokenType.NUMBER)) {
      return new Literal(this.previous().literal);
    }

    if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.expression();
      this.consume(TokenType.RIGHT_PAREN, 'Expect \')\' after expression.');
      return new Grouping(expr);
    }

    if (this.match(TokenType.PLUS)) {
      const operator = this.previous();
      const values = [];
      while (this.match(TokenType.NUMBER)) {
        const expr = new Literal(this.previous().literal);
        values.push(expr);
      }
      if (this.check(TokenType.LEFT_PAREN)) {
        const expr = this.expression();
        values.push(expr);
      }
      return new Binary(operator, values);
    }

    throw this.error(this.peek(), 'Expect expression.');
  }

  match(...types) {
    for (let type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }

    return false;
  }

  consume(type, message) {
    if (this.check(type)) return this.advance();

    throw this.error(this.peek(), message);
  }

  check(type) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  advance() {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  isAtEnd() {
    return this.peek().type === TokenType.EOF;
  }

  peek() {
    return this.tokens[this.current];
  }

  previous() {
    return this.tokens[this.current - 1];
  }

  error(token, message) {
    Lisp.error(token, message);
    return new ParserError();
  }
}
