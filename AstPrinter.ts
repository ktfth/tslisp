import Token from './Token';
import TokenType from './TokenType';
import * as Expr from './Expr';

class AstPrinter extends Expr.Expr {
  print(expr) {
    return expr.accept(this);
  }

  visitBinaryExpr(expr) {
    return this.parenthesized(expr.operator.lexeme,
      expr.left, expr.right);
  }

  visitGroupExpr(expr) {
    return this.parenthesized('group', expr.expression);
  }

  visitLiteralExpr(expr) {
    if (expr.value === null) return 'nil';
    return expr.value.toString();
  }

  visitUnaryExpr(expr) {
    return this.parenthesized(expr.operator.lexeme, expr.right);
  }

  parenthesized(name, ...exprs) {
    const builder = [];

    builder.push('(');
    builder.push(name);
    for (let expr of exprs) {
      builder.push(' ');
      builder.push(expr.accept(this));
    }
    builder.push(')');

    return builder.join('');
  }
}

const expression = new Expr.Binary(
  new Token(TokenType.PLUS, '+', null, 1),
  new Expr.Literal(5),
  new Expr.Literal(5),
);

console.log(new AstPrinter().print(expression));
