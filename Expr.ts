import Token from './Token';

export class Expr {
}

export class Binary extends Expr {
  operator: Token;
  values: Array<Expr>;

  constructor(operator: Token, values: Array<Expr>) {
    super();
    this.operator = operator;
    this.values = values;
  }

  accept(visitor) {
    return visitor.visitBinaryExpr(this);
  }

}

export class Grouping extends Expr {
  expression: Expr;

  constructor(expression: Expr) {
    super();
    this.expression = expression;
  }

  accept(visitor) {
    return visitor.visitGroupingExpr(this);
  }

}

export class Literal extends Expr {
  value: Object;

  constructor(value: Object) {
    super();
    this.value = value;
  }

  accept(visitor) {
    return visitor.visitLiteralExpr(this);
  }

}

export class Unary extends Expr {
  operator: Token;
  right: Expr;

  constructor(operator: Token, right: Expr) {
    super();
    this.operator = operator;
    this.right = right;
  }

  accept(visitor) {
    return visitor.visitUnaryExpr(this);
  }

}
