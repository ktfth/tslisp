"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var args = process.argv.slice(2);
if (args.length !== 1) {
    console.log('Usage: GenerateAst.ts <output directory>');
    process.exit(64);
}
var outputDir = path.join(process.cwd(), args[0]);
defineAst(outputDir, 'Expr', [
    'Binary   : Token operator, Expr left, Expr right',
    'Grouping : Expr expression',
    'Literal  : Object value',
    'Unary    : Token operator, Expr right',
]);
function defineAst(outputDir, baseName, types) {
    var filePath = path.join(outputDir, "".concat(baseName, ".ts"));
    fs.appendFileSync(filePath, 'import Token from \'./Token\';\n\n');
    fs.appendFileSync(filePath, "export class ".concat(baseName, " {\n"));
    fs.appendFileSync(filePath, '}\n');
    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
        var type = types_1[_i];
        var className = type.split(':')[0].trim();
        var fields = type.split(':')[1].trim();
        defineType(filePath, baseName, className, fields);
    }
}
function defineType(filePath, baseName, className, fieldList) {
    fs.appendFileSync(filePath, '\n');
    fs.appendFileSync(filePath, "export class ".concat(className, " extends ").concat(baseName, " {\n"));
    var fieldListConstructor = fieldList.split(', ').map(function (field) {
        var type = field.split(' ')[0];
        var param = field.split(' ')[1];
        return "".concat(param, ": ").concat(type);
    });
    fs.appendFileSync(filePath, "  ".concat(fieldListConstructor.join(';\n  '), ";\n"));
    fs.appendFileSync(filePath, '\n');
    fs.appendFileSync(filePath, "  constructor(".concat(fieldListConstructor.join(', '), ") {\n"));
    fs.appendFileSync(filePath, "    super();\n");
    var fields = fieldList.split(', ');
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var field = fields_1[_i];
        var name_1 = field.split(' ')[1];
        fs.appendFileSync(filePath, "    this.".concat(name_1, " = ").concat(name_1, ";\n"));
    }
    fs.appendFileSync(filePath, "  }\n");
    fs.appendFileSync(filePath, "\n");
    fs.appendFileSync(filePath, "  accept(visitor) {\n");
    fs.appendFileSync(filePath, "    return visitor.visit".concat(className).concat(baseName, "(this);\n"));
    fs.appendFileSync(filePath, "  }\n");
    fs.appendFileSync(filePath, "\n");
    fs.appendFileSync(filePath, "}\n");
}
