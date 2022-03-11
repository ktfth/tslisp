"use strict";
exports.__esModule = true;
var TokenType_1 = require("./TokenType");
var Token_1 = require("./Token");
var Scanner = /** @class */ (function () {
    function Scanner(source) {
        this.source = '';
        this.tokens = [];
        this.start = 0;
        this.current = 0;
        this.line = 0;
        this.source = source;
    }
    Scanner.prototype.scanTokens = function () {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }
        this.tokens.push(new Token_1["default"](TokenType_1["default"].EOF, '', null, this.line));
        return this.tokens;
    };
    Scanner.prototype.isAtEnd = function () {
        return this.current >= this.source.length;
    };
    Scanner.prototype.scanToken = function () {
        var c = this.advance();
        switch (c) {
            case '('.charCodeAt(0):
                this.addToken(TokenType_1["default"].LEFT_PAREN);
                break;
            case ')'.charCodeAt(0):
                this.addToken(TokenType_1["default"].RIGHT_PAREN);
                break;
            case '+'.charCodeAt(0):
                this.addToken(TokenType_1["default"].PLUS);
                break;
            case '-'.charCodeAt(0):
                this.addToken(TokenType_1["default"].MINUS);
                break;
            case ' '.charCodeAt(0): break;
            default:
                if (this.isDigit(c)) {
                    this.number();
                }
                else {
                    throw new Error('Unexpected character.');
                }
                break;
        }
    };
    Scanner.prototype.advance = function () {
        return this.source.charCodeAt(this.current++);
    };
    Scanner.prototype.addToken = function (type, literal) {
        if (literal === void 0) { literal = null; }
        this._addToken(type, literal);
    };
    Scanner.prototype._addToken = function (type, literal) {
        var text = this.source.substring(this.start, this.current);
        this.tokens.push(new Token_1["default"](type, text, literal, this.line));
    };
    Scanner.prototype.isDigit = function (c) {
        return c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0);
    };
    Scanner.prototype.number = function () {
        while (this.isDigit(this.peek()))
            this.advance();
        if (this.peek() === '.'.charCodeAt(0) && this.isDigit(this.peekNext())) {
            this.advance();
            while (this.isDigit(this.peek()))
                this.advance();
        }
        this.addToken(TokenType_1["default"].NUMBER, parseFloat(this.source.substring(this.start, this.current)));
    };
    Scanner.prototype.peek = function () {
        if (this.isAtEnd())
            return '\0'.charCodeAt(0);
        return this.source.charCodeAt(this.current);
    };
    Scanner.prototype.peekNext = function () {
        if (this.current + 1 >= this.source.length)
            return '\0';
        return this.source.charCodeAt(this.current + 1);
    };
    return Scanner;
}());
exports["default"] = Scanner;
