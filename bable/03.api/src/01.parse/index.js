const parser = require('@babel/parser');

const sourceCode = `
  function abs(number) {
    const a = 1;
    const b = 2;
    const c = 3;
    if (number >= 0) {  // test
      return number;  // consequent
    } else {
      return -number; // alternate
    }
  }
`;

const jsxSourceCode = `
  function formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }

  const user = {
    firstName: 'Harper',
    lastName: 'Perez'
  };

  const element = (
    <h1>
      Hello, {formatName(user)}!
    </h1>
  );

  ReactDOM.render(
    element,
    document.getElementById('root')
  );
`

const ast = parser.parse(jsxSourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
});

console.log(ast)


const ast1 = parser.parseExpression(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
})

console.log(ast1)