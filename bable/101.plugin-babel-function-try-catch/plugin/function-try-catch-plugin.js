"use strict";
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const template = require("@babel/template");
const {
    transformFromAstSync
} = require("@babel/core");

const LIMIT_LINE = 0;

module.exports = function (source) {
    // 1、解析
    const ast = parser.parse(source, {
        sourceType: 'unambiguous'
    });

    // 2、遍历
    traverse(ast, {
        'ArrowFunctionExpression|FunctionExpression|FunctionDeclaration': function FunctionExpression(path, state) {
            generateTryCatch(path)
        },
        ClassDeclaration(path, state) {
            path.traverse({
                ClassMethod(path) {
                    generateTryCatch(path);
                }
            });
        },
        ObjectExpression(path, state) {
            path.traverse({
                ObjectMethod(path) {
                    generateTryCatch(path);
                }
            });
        }
    });

    // 3、生成source源码
    const {
        code
    } = transformFromAstSync(ast, null, {
        configFile: false
    });

    // console.log(code)

    function generateTryCatch(path) {
        const node = path.node;
        const params = node.params;
        const blockStatement = node.body;
        // 函数function内部代码，将函数内部代码块放入 try 节点
        const isGenerator = node.generator;
        const isAsync = node.async;

        // =================================== 边界情况 return 处理 ============================
        // 1、如果有 try catch 包裹了，则不需要
        // 2、防止 circle loops 
        // 3、需要 try catch 的只能是语句，像 () => 0 这种的 body，是不需要的
        // 4、如果函数内容小于等于 LIMIT_LINE 行不去 try/catch，当然这个函数可以暴露出来给用户设置
        if (blockStatement.body && types.isTryStatement(blockStatement.body[0]) || !types.isBlockStatement(blockStatement) && !types.isExpressionStatement(blockStatement) || blockStatement.body && blockStatement.body.length <= LIMIT_LINE) {
            return;
        }

        // 创建 catch 节点中的代码
        const catchStatement = template.statement("ErrorCapture(error)")();
        console.log(catchStatement, 88);
        //  catchBody
        const catchClause = types.catchClause(types.identifier('error'), types.blockStatement([catchStatement]));

        // 创建 try/catch 的 ast
        const tryStatement = types.tryStatement(blockStatement, catchClause);

        // 创建新节点
        let func = null;
        // 判断：类方法、对象方法、函数申明、函数表达式
        if (types.isClassMethod(node)) {
            // 用 types.classMethod 生成 ast
            // types.BlockStatement([tryStatement]) 新的 ast 节点
            func = types.classMethod(node.kind, node.key, params, types.BlockStatement([tryStatement]), node.computed, node.static);
        } else if (types.isObjectMethod(node)) {
            func = types.objectMethod(node.kind, node.key, params, types.BlockStatement([tryStatement]), node.computed);
        } else if (types.isFunctionDeclaration(node)) {
            func = types.functionDeclaration(node.id, params, types.BlockStatement([tryStatement]), isGenerator, isAsync);
        } else {
            func = types.functionExpression(node.id, params, types.BlockStatement([tryStatement]), isGenerator, isAsync);
        }

        // 替换原节点
        path.replaceWith(func);
    }

    return code;
}