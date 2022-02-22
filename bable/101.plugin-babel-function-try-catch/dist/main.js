/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var obj = {
  objFn() {
    try {
      console.log('object method');
    } catch (error) {
      ErrorCapture(error);
    }
  },

  objFn1: function () {
    try {
      console.log('function expression in obj');
    } catch (error) {
      ErrorCapture(error);
    }
  },
  objFn2: () => 0,
  objFun4: () => {
    try {
      console.log('try catch ');
    } catch (error) {}
  }
};

class MyClass {
  constructor() {
    try {
      console.log('constructor method');
    } catch (error) {
      ErrorCapture(error);
    }
  }

  classMethod() {
    try {
      console.log('class method');
    } catch (error) {
      ErrorCapture(error);
    }
  }

}

var arrowFn = function () {
  try {
    console.log('arrow function expression');
  } catch (error) {
    ErrorCapture(error);
  }
};

var functionExpression = function () {
  try {
    console.log('normal function expression');
  } catch (error) {
    ErrorCapture(error);
  }
};

function fnDeclaration() {
  try {
    console.log('function declaration');
  } catch (error) {
    ErrorCapture(error);
  }
}
/******/ })()
;