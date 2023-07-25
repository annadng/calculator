currentOp = '';
firstOp = '';
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
deleteButton.addEventListener('click', deleteChar);

function resetScreen() {
    displayCurrentOp.textContent = '';
    displayLastOp.textContent = '';
}

function displayOnScreen(digit) {
    displayCurrentOp.textContent += digit;
    currentDigit = displayCurrentOp.textContent;
}

function deleteChar() {
    if (displayCurrentOp.textContent === '') return
    displayCurrentOp.textContent = displayCurrentOp.textContent.toString().slice(0, -1);
}

function updateOperation(operator) {
    if (displayLastOp.textContent !== '') {
        currentOp = operator;
        calculatePair();
        displayLastOp.textContent = `${firstDigit} ${currentOp}`;
        displayCurrentOp.textContent = '';
    } else {
    firstOp = operator;
    firstDigit = currentDigit;
    displayLastOp.textContent = `${firstDigit} ${firstOp}`;
    displayCurrentOp.textContent = '';
    }
}

function calculatePair() {
    if (currentOp === '') return;
    secondDigit = displayCurrentOp.textContent;
    displayCurrentOp.textContent = operate(firstOp, firstDigit, secondDigit);
    displayLastOp.textContent = '';
    firstDigit = displayCurrentOp.textContent;
    firstOp = currentOp;
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