const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

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

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx']
});

traverse(ast, {
    VariableDeclaration(path, state) {
        console.log(generate);
        const allNextSiblings = path.getAllNextSiblings();
        console.log(allNextSiblings)
        // for (const siblings in allNextSiblings) {
        //    console.log(generate(siblings.node))
        // }
        debugger
    },
    BinaryExpression(path, state) {
        console.log(generate);
        debugger
    }
});

const {
    code,
    map
} = generate(ast);
console.log(code);