const esprima = require("esprima");
const esTraverse = require("estraverse");
const esCodeGen = require("escodegen");

// const parser = require('@babel/parser');
// const traverse = require('@babel/traverse').default;
// const generate = require('@babel/generator').default;
// const types = require('@babel/types');

const sourceCode = `
  let name = "guang"
`;


let astTree = esprima.parseScript(sourceCode); // 生成语法树

console.log(astTree);

// 遍历语法树
esTraverse.traverse(astTree, {
  enter(node) {
    console.log("enter", node.type);

    if (node.type === 'VariableDeclaration' && node.kind === 'let') {
      node.kind = 'const'
    }
  },
  leave(node) {
    console.log("leave", node.type);
  }
});

console.log(astTree);
// 编译修改后的语法树；
let compileTreeJS = esCodeGen.generate(astTree);

console.log(compileTreeJS);