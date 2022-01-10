"use strict";
exports.__esModule = true;
var TokenType_1 = require("./TokenType");
var Lisp = require("./index");
var Interpreter = /** @class */ (function () {
    function Interpreter() {
    }
    Interpreter.prototype.interpret = function (expression) {
        try {
            var value = this.evaluate(expression);
            console.log(this.stringify(value));
        }
        catch (error) {
            Lisp.runtimeError(error);
        }
    };
    Interpreter.prototype.stringify = function (object) {
        if (object instanceof Number) {
            var text = object.toString();
            if (text.endsWith('.0')) {
                text = text.substring(0, text.length - 2);
            }
            return text;
        }
        return object.toString();
    };
    Interpreter.prototype.visitLiteralExpr = function (expr) {
        return expr.value;
    };
    Interpreter.prototype.visitUnaryExpr = function (expr) {
        return null;
    };
    Interpreter.prototype.visitGroupingExpr = function (expr) {
        return this.evaluate(expr.expression);
    };
    Interpreter.prototype.evaluate = function (expr) {
        return expr.accept(this);
    };
    Interpreter.prototype.visitBinaryExpr = function (expr) {
        var self = this;
        var values = expr
            .values
            .map(function (value) { return self.evaluate(value); });
        switch (expr.operator.type) {
            case TokenType_1["default"].PLUS:
                if (values.some(function (value) { return value.constructor.toString().indexOf('Number') > -1; })) {
                    return values.reduce(function (a, b) { return a + b; });
                }
                break;
        }
        return null;
    };
    return Interpreter;
}());
exports["default"] = Interpreter;
