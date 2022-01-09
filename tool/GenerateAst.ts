import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.log('Usage: GenerateAst.ts <output directory>');
  process.exit(64);
}
const outputDir = path.join(process.cwd(), args[0]);

defineAst(outputDir, 'Expr', [
  'Binary   : Token operator, Array<Expr> values',
  'Grouping : Expr expression',
  'Literal  : Object value',
  'Unary    : Token operator, Expr right',
]);

function defineAst(outputDir, baseName, types) {
  const filePath = path.join(outputDir, `${baseName}.ts`);
  fs.appendFileSync(filePath, 'import Token from \'./Token\';\n\n');
  fs.appendFileSync(filePath, `export class ${baseName} {\n`);

  fs.appendFileSync(filePath, '}\n');

  for (let type of types) {
    const className = type.split(':')[0].trim();
    const fields = type.split(':')[1].trim();
    defineType(filePath, baseName, className, fields);
  }
}

function defineType(filePath, baseName, className, fieldList) {
  fs.appendFileSync(filePath, '\n');
  fs.appendFileSync(filePath, `export class ${className} extends ${baseName} {\n`);
  const fieldListConstructor = fieldList.split(', ').map(field => {
    const type = field.split(' ')[0];
    const param = field.split(' ')[1];
    return `${param}: ${type}`;
  });

  fs.appendFileSync(filePath, `  ${fieldListConstructor.join(';\n  ')};\n`);
  fs.appendFileSync(filePath, '\n');

  fs.appendFileSync(filePath, `  constructor(${fieldListConstructor.join(', ')}) {\n`);
  fs.appendFileSync(filePath, `    super();\n`);

  const fields = fieldList.split(', ');
  for (let field of fields) {
    const name = field.split(' ')[1];
    fs.appendFileSync(filePath, `    this.${name} = ${name};\n`);
  }

  fs.appendFileSync(filePath, `  }\n`);

  fs.appendFileSync(filePath, `\n`);
  fs.appendFileSync(filePath, `  accept(visitor) {\n`);
  fs.appendFileSync(filePath, `    return visitor.visit${className}${baseName}(this);\n`);
  fs.appendFileSync(filePath, `  }\n`);

  fs.appendFileSync(filePath, `\n`);
  fs.appendFileSync(filePath, `}\n`);
}
