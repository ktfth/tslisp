"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Expr = require("./Expr");
var AstPrinter = /** @class */ (function (_super) {
    __extends(AstPrinter, _super);
    function AstPrinter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AstPrinter.prototype.print = function (expr) {
        return expr.accept(this);
    };
    AstPrinter.prototype.visitBinaryExpr = function (expr) {
        return this.parenthesized(expr.operator.lexeme, expr.left, expr.right);
    };
    AstPrinter.prototype.visitGroupingExpr = function (expr) {
        return this.parenthesized('group', expr.expression);
    };
    AstPrinter.prototype.visitLiteralExpr = function (expr) {
        if (expr.value === null)
            return 'nil';
        return expr.value.toString();
    };
    AstPrinter.prototype.visitUnaryExpr = function (expr) {
        return this.parenthesized(expr.operator.lexeme, expr.right);
    };
    AstPrinter.prototype.parenthesized = function (name) {
        var exprs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            exprs[_i - 1] = arguments[_i];
        }
        var builder = [];
        builder.push('(');
        builder.push(name);
        for (var _a = 0, exprs_1 = exprs; _a < exprs_1.length; _a++) {
            var expr = exprs_1[_a];
            builder.push(' ');
            builder.push(expr.accept(this));
        }
        builder.push(')');
        return builder.join('');
    };
    return AstPrinter;
}(Expr.Expr));
exports["default"] = AstPrinter;
// const expression = new Expr.Binary(
//   new Token(TokenType.PLUS, '+', null, 1),
//   new Expr.Literal(5),
//   new Expr.Literal(5),
// );
//
// console.log(new AstPrinter().print(expression));
