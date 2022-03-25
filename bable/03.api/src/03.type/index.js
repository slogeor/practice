const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');

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
  Declaration(path, state) {
    if (types.isFunctionDeclaration(path)) {
      debugger
    }
  },
  Statement: {
    enter(path, state) {
      // if (types.isIfStatement(path)) {
      //   debugger
      // }

      if (types.assertIfStatement(path)) {
        debugger
      }
    },
  }
});