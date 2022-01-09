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
var TokenType_1 = require("./TokenType");
var Expr_1 = require("./Expr");
var Lisp = require("./index");
var ParserError = /** @class */ (function (_super) {
    __extends(ParserError, _super);
    function ParserError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ParserError;
}(Error));
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.current = 0;
        this.tokens = [];
        this.current = 0;
        this.tokens = tokens;
    }
    Parser.prototype.parse = function () {
        try {
            return this.expression();
        }
        catch (error) {
            return null;
        }
    };
    Parser.prototype.expression = function () {
        return this.term();
    };
    Parser.prototype.term = function () {
        return this.factor();
    };
    Parser.prototype.factor = function () {
        return this.unary();
    };
    Parser.prototype.unary = function () {
        return this.primary();
    };
    Parser.prototype.primary = function () {
        if (this.match(TokenType_1["default"].NUMBER)) {
            return new Expr_1.Literal(this.previous().literal);
        }
        if (this.match(TokenType_1["default"].LEFT_PAREN)) {
            var expr = this.expression();
            this.consume(TokenType_1["default"].RIGHT_PAREN, 'Expect \')\' after expression.');
            return new Expr_1.Grouping(expr);
        }
        if (this.match(TokenType_1["default"].PLUS)) {
            var operator = this.previous();
            var values = [];
            while (this.match(TokenType_1["default"].NUMBER)) {
                var expr = new Expr_1.Literal(this.previous().literal);
                values.push(expr);
            }
            if (this.check(TokenType_1["default"].LEFT_PAREN)) {
                var expr = this.expression();
                values.push(expr);
            }
            return new Expr_1.Binary(operator, values);
        }
        throw this.error(this.peek(), 'Expect expression.');
    };
    Parser.prototype.match = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        for (var _a = 0, types_1 = types; _a < types_1.length; _a++) {
            var type = types_1[_a];
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    };
    Parser.prototype.consume = function (type, message) {
        if (this.check(type))
            return this.advance();
        throw this.error(this.peek(), message);
    };
    Parser.prototype.check = function (type) {
        if (this.isAtEnd())
            return false;
        return this.peek().type === type;
    };
    Parser.prototype.advance = function () {
        if (!this.isAtEnd())
            this.current++;
        return this.previous();
    };
    Parser.prototype.isAtEnd = function () {
        return this.peek().type === TokenType_1["default"].EOF;
    };
    Parser.prototype.peek = function () {
        return this.tokens[this.current];
    };
    Parser.prototype.previous = function () {
        return this.tokens[this.current - 1];
    };
    Parser.prototype.error = function (token, message) {
        Lisp.error(token, message);
        return new ParserError();
    };
    return Parser;
}());
exports["default"] = Parser;
