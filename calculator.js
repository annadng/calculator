currentOp = '';
currentDigit = '';
firstDigit = '';
secondDigit = '';

const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const percentButton = document.getElementById('percent');
const periodButton = document.getElementById('period');
const equalsButton = document.getElementById('equal');
const displayLastOp = document.getElementById('displayLast');
const displayCurrentOp = document.getElementById('displayCurrent');

digitButtons.forEach(button => button.addEventListener('click', () => displayOnScreen(button.textContent)));
operatorButtons.forEach(button => button.addEventListener('click', () => updateOperation(button.textContent)));
equalsButton.addEventListener('click', calculatePair);
clearButton.addEventListener('click', resetScreen);

function resetScreen() {
    displayCurrentOp.textContent = '';
    displayLastOp.textContent = '';
}

function displayOnScreen(digit) {
    displayCurrentOp.textContent += digit;
    currentDigit = displayCurrentOp.textContent;
}

function updateOperation(operator) {
    currentOp = operator
    firstDigit = currentDigit
    displayLastOp.textContent = `${firstDigit} ${currentOp}`;
    displayCurrentOp.textContent = '';
}

function calculatePair() {
    if (currentOp === '') return;
    secondDigit = displayCurrentOp.textContent;
    displayCurrentOp.textContent = operate(currentOp, firstDigit, secondDigit);
    displayLastOp.textContent = '';
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    if (operator == '+') return add(a, b);
    if (operator == '-') return subtract(a, b);
    if (operator == 'x') return multiply(a, b);
    if (operator == '÷') return divide(a, b);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}