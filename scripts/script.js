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
    calculator.displayResult(result);
  },
  subtract: function(a,b) {
    let result = a-b;
    calculator.displayResult(result);
  },
  divide: function(a,b) {
    let result = a/b;
    calculator.displayResult(result);
  },
  multiply: function(a,b) {
    let result = a*b;
    calculator.displayResult(result);
  },
  exponentiate: function(a,b) {
    let result = a ** b;
    calculator.displayResult(result);
  },
  factorial: function(a) {
    if(!calculator.operand2 && calculator.operand1) {
    let result = a;
    for (let i = a-1; i > 0; i--) {
      result *= i;
    }
    calculator.displayResult(result);
    }
  },

  operand1: '',
  operand2: '',
  operator: '',
  displayedOperator: '',
  displayedOperand1: '',
  displayedOperand2: '',

  buttons: document.querySelectorAll('button'),
  display: document.querySelector('#display p'),

  toOperand1: function(key) {
    calculator.operand1 += key.id || key;
    this.updateDisplay();
    },
  toOperand2: function(key) {
    calculator.operand2 += key.id || key;
    this.updateDisplay();
    },
  toOperator: function(key) {
    calculator.operator = key.id || calculator.convertKeyOperand(key);
    this.updateDisplay();
  },
  convertKeyOperand: function (key) {
    switch (key) {
      case '+':
        return 'add';
      case '-':
        return 'subtract';
      case '/':
        return 'divide';
      case '*':
        return 'multiply';
      case 'e':
        return 'exponentiate';
      case 'f':
        return 'factorial';
      
    }
  },
  updateDisplayedOperator: function() {
    switch (this.operator) {
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
      case '':
        calculator.displayedOperator = '';
    }
  },
  updateDisplayedOperand1: function() {
    this.displayedOperand1 = this.operand1;
  },
  updateDisplayedOperand2: function() {
    this.displayedOperand2 = this.operand2;
  },
  updateDisplay: function() {
    this.updateDisplayedOperand1();
    this.updateDisplayedOperand2();
    this.updateDisplayedOperator();
    this.display.textContent = `${this.displayedOperand1} ${this.displayedOperator} ${this.displayedOperand2}`;
  },
  inputCheckerMouse: function() {
    let key = this;
    if (!isNaN(parseInt((this.id)))) {
      if (!calculator.operator) {
        calculator.toOperand1(key);
      } else {
        calculator.toOperand2(key);
      }
    }
    else if (this.id === 'equal') {
      if (calculator.operand2) calculator.evaluate();
    } else if (this.id === 'ac') {
      calculator.resetCalculator();
      calculator.resetDisplay();
    } else {
        if (!calculator.operand1) {}
        else if (!calculator.operand2) {
          calculator.toOperator(key);
          if (this.id === 'factorial') {calculator.evaluate();}
      } else calculator.evaluate();
    }
  },
  inputCheckerKey: function(e) {
    let key = e.key;
    if (!isNaN(parseInt((key)))) {
      if (!calculator.operator) {
        calculator.toOperand1(key);
      } else {
        calculator.toOperand2(key);
      }
    }
    else if (key === '=') {
      if (calculator.operand2) calculator.evaluate();
    } else if (key === 'c') {
      calculator.resetCalculator();
      calculator.resetDisplay();
    } else {
        if (!calculator.operand1) {}
        else if (!calculator.operand2) {
          calculator.toOperator(key);
          if (key === 'f') {calculator.evaluate();}
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
  },
  displayResult: function(result) {
    calculator.display.textContent = result;
    calculator.resetCalculator();
  },
  resetCalculator: function() {
    calculator.operand1 = '';
    calculator.operand2 = '';
    calculator.operator = '';
    calculator.updateDisplayedOperator();
    calculator.updateDisplayedOperand1();
    calculator.updateDisplayedOperand2();
  },
  resetDisplay: function() {
    calculator.display.textContent = '';
  },
}

calculator.buttons.forEach(button => button.addEventListener('click', calculator.inputCheckerMouse));
window.addEventListener('keydown', calculator.inputCheckerKey);
function log(e) {console.log(e.key)};