const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const template = require('@babel/template').default;
const types = require('@babel/types');

const sourceCode = `
  /**
   * @description abs
   */
  function abs(number, type) {
    /** hello */
    let a = 1;
    const b = 2;
    const c = 3;
    // 判断条件
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
  // --------- demo1 ------------
  // path.node::当前 AST 节点
  // NumericLiteral(path, state) {
  //   console.log(path.node.value)
  //   debugger
  // }




  // --------- demo2 ------------
  // path.parent::父 AST 节点
  // path.parentPath::父 AST 节点的 path
  // UnaryExpression(path, state) {
  //   console.log(path.type)
  //   console.log(path.parent)
  //   console.log(path.parent.type);
  //   console.log(path.parentPath.node.type)
  //   debugger
  // }




  // --------- demo3 ------------
  // inList::节点是否在数组中
  // VariableDeclarator(path, state) {
  //   console.log(path.inList)
  //   debugger
  // }




  // --------- demo4: 查询 ------------
  // get(key)::获取某个属性的 path
  // getSibling(index)::来获得同级路径
  // path.getNextSibling()::获取下一个兄弟节点
  // path.getPrevSibling()::获取上一个兄弟节点
  // path.getAllPrevSiblings()::获取之前的所有兄弟节点
  // path.getAllNextSiblings()::获取之后的所有兄弟节点
  // path.find(callback)::从当前节点到根节点来查找节点（包括当前节点），调用 callback（传入 path）来决定是否终止查找
  // path.findParent(callback)::从当前节点到根节点来查找节点（不包括当前节点），调用 callback（传入 path）来决定是否终止查找
  // traverse(visitor, state)::遍历当前节点的子节点，传入 visitor 和 state（state 是不同节点间传递数据的方式）
  // IfStatement(path, state) {
  //   // console.log(path.get('test'))
  //   // console.log(path.getSibling('1'))
  //   console.log(path.getNextSibling())
  //   // 使用 path.inList 来判断路径是否有同级节点，
  //   // 使用 path.key 获取路径所在容器的索引,
  //   // 使用 path.container 获取路径的容器（包含所有同级节点的数组）
  //   // 使用 path.listKey 获取容器的key

  //   // 查找 BlockStatement
  //   const blockPath = path.findParent((parentPath) => {
  //     if (parentPath.type === 'BlockStatement') {
  //       path.stop()
  //     }
  //     return parentPath;
  //   })
  //   console.log(blockPath)

  //   console.log(blockPath.node.body[0].kind)
  //   debugger
  // }




  // --------- demo5: 增加、删除 ------------
  // insertBefore(nodes)::在之前插入节点，可以是单个节点或者节点数组
  // insertAfter(nodes)::在之后插入节点，可以是单个节点或者节点数组
  // remove()::删除当前节点
  // IfStatement(path, state) {
  //   const path1 = path.getSibling('1');

  //   const path2 = path.getSibling('2');

  //   const ast1 = template.ast(`const d1 = 1`);
  //   const ast2 = template.ast(`const d2 = 2`);

  //   path1.insertBefore(ast1)
  //   path1.insertAfter(ast2)
  //   // 查找 BlockStatement
  //   const blockPath = path.findParent((parentPath) => {
  //     if (parentPath.type === 'BlockStatement') {
  //       path.stop()
  //     }
  //     return parentPath;
  //   })

  //   path2.remove()
  //   console.log(blockPath.node.body)
  //   debugger
  // }


  // --------- demo6: 修改 ------------
  // replaceWith(replacement)::用某个节点替换当前节点
  // replaceWithMultiple(nodes)::用多个节点替换当前节点
  // replaceWithSourceString(replacement)::解析源码成 AST，然后替换当前节点
  // IfStatement(path, state) {
  //   const path1 = path.getSibling('1');
  //   const path2 = path.getSibling('2');

  //   const ast1 = template.ast(`const d1 = 1`);
  //   const ast2 = template.ast(`const d2 = 2`);
  //   const ast3 = template.ast(`const d3 = 3`);

  //   path1.replaceWith(ast1)

  //   // path2.replaceWithMultiple([ast2, ast3])

  //   // path1.replaceWithSourceString(`a = a + 1`)

  //   // 查找 BlockStatement
  //   const blockPath = path.findParent((parentPath) => {
  //     if (parentPath.type === 'BlockStatement') {
  //       path.stop()
  //     }
  //     return parentPath;
  //   })

  //   console.log(blockPath.node.body)
  //   debugger
  // }

  // --------- demo7: 作业 ------------
  // isXxx(opts)::判断当前节点是否是某个类型，可以传入属性和属性值进一步判断，比如path.isIdentifier({name: 'a'})
  // assertXxx(opts)::同 isXxx，但是不返回布尔值，而是抛出异常
  // skip()::跳过当前节点的子节点的遍历
  // stop()::结束所有遍历
  // VariableDeclarator(path, state) {
  //   console.log(path.inList)
  //   debugger
  // }




  // --------- demo8: scope ------------
  // path.scope.block::能形成 scope 的有这些节点，这些节点也叫 block 节点
  // scope.bindings、scope.references::保存的是声明的变量和对应的值，每一个声明叫做一个binding
  IfStatement(path, state) {
    console.log(path.scope.block.type)

    // kind 代表形式声明的变量类型，var、let、const 
    // param 代表参数的声明  
    // module 代表 import 的变量的声明
    // binding 有多种 kind，代表不同的声明方式。
    // binding.identifier 代表标识符的 AST。
    // binding.path 代表标整个声明语句的 AST
    // binding.referenced 代表声明的变量是否被引用
    // binding.constant 代表变量是否被修改过
    // 如果被引用了，就可以通过 binding.referencePaths 拿到所有引用的语句的 path
    // 如果被修改了，可以通过 binding.constViolations 拿到所有修改的语句的 path

    console.log(path.scope.bindings)
    debugger
  }



});

const {
  code,
  map
} = generate(ast);

console.log(code);