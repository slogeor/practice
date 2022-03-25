const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

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

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
});

traverse(ast, {
  FunctionDeclaration(path, state) {
    debugger
  },
  IfStatement: {
    enter(path, state) {
      debugger
    },
    exit(path, state) {
      debugger
    }
  }
});