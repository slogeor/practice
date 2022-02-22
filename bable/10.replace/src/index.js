const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const sourceCode = `
    foo === bar 
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['js']
});

traverse(ast, {
    BinaryExpression (path) {
        const isMatchCondition = path.node.operator === '===' && // 若操作符不为 === 则不做任何操作
          types.isIdentifier(path.node.left, { name: 'foo' }) && // 若操作符左侧不为变量或变量名不为 foo 则不做任何操作
          types.isIdentifier(path.node.right, { name: 'bar' }) // 若操作符右侧不为变量或变量名不为 bar 则不做任何操作
 
        if (isMatchCondition) {
          path.node.left = types.identifier('relx') // 把操作符左侧的变量名改为 relx
          path.node.right = types.identifier('悦刻') // 把操作符右侧的变量名改为 悦刻
        }
      }
});

const { code, map } = generate(ast);

console.log(code);
