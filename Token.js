"use strict";
exports.__esModule = true;
var Token = /** @class */ (function () {
    function Token(type, lexeme, literal, line) {
        this.type = '';
        this.lexeme = '';
        this.literal = '';
        this.line = 0;
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }
    Token.prototype.toString = function () {
        return "".concat(this.type, " ").concat(this.lexeme, " ").concat(this.literal);
    };
    return Token;
}());
exports["default"] = Token;
