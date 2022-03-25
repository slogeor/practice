const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const template = require('@babel/template').default;
const generate = require('@babel/generator').default;


const sourceCode = `
  function abs(number) {
    const a = 1;
    const b = 2;
    const c = 3;
    if (number >= 0) {
      return number;
    } else {
      return -number;
    }
  }
`;

const fn = template(`console.log(NAME)`);

const ast1 = fn({
  NAME: '"relx"',
});

const {
  code: code1,
} = generate(ast1);
console.log(code1);


const ast2 = template.ast(`catchError(error)`);
const {
  code: code2,
} = generate(ast2);
console.log(code2);
