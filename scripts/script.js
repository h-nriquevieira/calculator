/* 
- Create event to listen for chance on input value and assign it to operand1 property on calculator if operator is empty
- Assign value to operator property when one is selected
- Assign input value to operand2 if operator is not empty
- If operand2, clicking on any operator should evaluate the expression;

*/
const buttons = document.querySelectorAll('button');
const calculator = {
  add: function(a,b) {
    let result = a+b;
    console.log(result);
  },
  subtract: function(a,b) {
    let result = a-b;
    console.log(result);
  },
  divide: function(a,b) {
    let result = a/b;
    console.log(result);
  },
  multiply: function(a,b) {
    let result = a*b;
    console.log(result);
  },
  exponentiate: function(a,b) {
    let result = a ** b;
    console.log(result);
  },
  factorial: function(a) {
    let result = a;
    for (let i = a-1; i > 0; i--) {
      result *= i;
    }
    console.log(result);
    return result;
  },

  operand1: '',
  operand2: '',
  operator: '',
  displayedOperator: '',

  toOperand1: function(key) {
    calculator.operand1 += key.id;
    },
  toOperand2: function(key) {
    calculator.operand2 += key.id;
    },
  toOperator: function(key) {
    calculator.operator = key.id;
  },
  updateDisplayedOperator: function(key) {
    switch (this.id) {
      case 'add':
        calculator.displayedOperator = '+';
        break;
      case 'subtract':
        calculator.displayedOperator = '-';
        break;
      case 'divide':
        calculator.displayedOperator = '/';
        break;
      case 'multiply':
        calculator.displayedOperator = 'x';
        break;
      case 'exponentiate':
        calculator.displayedOperator = '^';
        break;
      case 'factorial':
        calculator.displayedOperator = '!';
        break;
    }
  },
  typeChecker: function() {
    let key = this;
    if (!isNaN(parseInt((this.id)))) {
      if (!calculator.operator) {
        calculator.toOperand1(key);
      } else {
        calculator.toOperand2(key);
      }
    }
    else if (this.id === 'equal') {
      calculator.evaluate();
    } else {
      if (!calculator.operand2) {
        calculator.toOperator(key);
        updateDisplayedOperator(key);
      } else calculator.evaluate();
    }
  },
  evaluate: function() {
    switch (calculator.operator) {
      case 'add':
        calculator.add(+calculator.operand1, +calculator.operand2);
        break;
      case 'subtract':
        calculator.subtract(+calculator.operand1, +calculator.operand2);
        break;
      case 'divide':
        calculator.divide(+calculator.operand1, +calculator.operand2);
        break;
      case 'multiply':
        calculator.multiply(+calculator.operand1, +calculator.operand2);
        break;
      case 'exponentiate':
        calculator.exponentiate(+calculator.operand1, +calculator.operand2);
        break;
      case 'factorial':
        calculator.factorial(+calculator.operand1);
        break;
    }
  }
}

buttons.forEach(button => button.addEventListener('click', calculator.typeChecker));