import TokenType from './TokenType';
import * as Lisp from './index';

export default class Interpreter {
  constructor() {}

  interpret(expression) {
    try {
      const value = this.evaluate(expression);
      console.log(this.stringify(value));
    } catch (error) {
      Lisp.runtimeError(error);
    }
  }

  stringify(object) {
    if (object instanceof Number) {
      let text = object.toString();
      if (text.endsWith('.0')) {
        text = text.substring(0, text.length - 2);
      }
      return text;
    }

    return object.toString();
  }

  visitLiteralExpr(expr) {
    return expr.value;
  }

  visitUnaryExpr(expr) {
    return null;
  }

  visitGroupingExpr(expr) {
    return this.evaluate(expr.expression);
  }

  evaluate(expr) {
    return expr.accept(this);
  }

  visitBinaryExpr(expr) {
    const self = this;
    const values = expr
      .values
      .map(value => self.evaluate(value));

    switch (expr.operator.type) {
      case TokenType.PLUS:
        if (values.some(value => value.constructor.toString().indexOf('Number') > -1)) {
          return values.reduce((a, b) => a + b);
        }
        break;
    }

    return null;
  }
}
