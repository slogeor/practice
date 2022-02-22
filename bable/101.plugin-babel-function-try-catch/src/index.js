var obj = {
    objFn() {
        console.log('object method')
    },
    objFn1: function () {
        console.log('function expression in obj')
    },
    objFn2: () => 0,

    objFun4: () => {
        try {
            console.log('try catch ')
        } catch (error) {

        }
    }
};

class MyClass {
    constructor() {
        console.log('constructor method')
    }

    classMethod() {
        console.log('class method')
    }
}

var arrowFn = () => {
    console.log('arrow function expression')
}

var functionExpression = function () {
    console.log('normal function expression')
}

function fnDeclaration() {
    console.log('function declaration')
}