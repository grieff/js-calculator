// Calculator information
const calculator = {
    displayValue: '0', // input user, shown on screen
    firstOperand: null, // first operand for any expresssion
    waitingForSecondOperand: false, // flag: checks whether an expresssion can be evaluated or whether the seconds operand ness to be inputed
    operator: null, // will hold operator for an expression
};

// Function that changes the display
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

// Key presses
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    // equivalent to const target = event.target
    // target: object represents the element that was clicked

    // If the element clickes is no a button
    if (!target.matches('button')) {
        return;
    }
    // If is a button, then shows the value
    if (target.classList.contains('operator')) {
        // Operator store function call 
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        // Dot input function call
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    // Reset the calculator
    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    // Digit input function call
    inputDigit(target.value);
    updateDisplay();
})


// Number input
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else { // Overwrite displayValue if the current value is 0 otherwise append to it
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}


// Decimal input
function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;

    //If the displayValue does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
        //Apend the decimal point
        calculator.displayValue += dot;
    }
}


// Operators
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    // input number to float number and store it in firstOperand if it does not exist
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }


    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    // Then wait for the second operand
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

// Perform the calculations
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '=': (firstOperand, secondOperand) => secondOperand
};

// Reset the calculator
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}