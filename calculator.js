previousOp = ''; // stores operator that was first selected
currentOp = ''; // stores operator that is then selected as an alternative to equals button
firstDigit = '';
calcResult = 0; // use as condition for resetting screen if new digit is clicked after calculation

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
percentButton.addEventListener('click', percentage);
periodButton.addEventListener('click', addPeriod);

function resetScreen() {
    displayCurrentOp.textContent = '';
    displayLastOp.textContent = '';
    currentOp = '';
    previousOp = '';
    calcResult = 0;
}

function displayOnScreen(digit) {
    if (calcResult === 1) {
        // if digit is selected right after a calculation has been executed, replace the previous number instead of appending
        displayCurrentOp.textContent = digit;
        calcResult = 0;
    } else {
        // append digit
        displayCurrentOp.textContent += digit;
        displayCurrentOp.textContent;
    }
}

function deleteChar() {
    if (displayCurrentOp.textContent === '') return
    displayCurrentOp.textContent = displayCurrentOp.textContent.toString().slice(0, -1);
}

function percentage() {
    if (displayLastOp.textContent === '' && displayCurrentOp.textContent !== '') {
        displayCurrentOp.textContent /= 100;
    }
    return;
}

function addPeriod() {
    if (displayCurrentOp.textContent.includes('.')) return;
    if (displayCurrentOp.textContent === '') {
        displayCurrentOp.textContent += 0 + '.';
    } else {
        displayCurrentOp.textContent += '.';
    }
}

function updateOperation(operator) {
    if (displayCurrentOp.textContent === '' && displayLastOp.textContent === '') return;
    if (displayLastOp.textContent !== '' && displayCurrentOp.textContent === '') {
        // if the first digit and operator has been selected but the operator is changed
        previousOp = operator;
        displayLastOp.textContent = `${firstDigit} ${previousOp}`;
    }
    else if (displayLastOp.textContent !== '' && displayCurrentOp.textContent !== '') {
        // if an operator is selected as an alternative to the equals button
        currentOp = operator;
        calculatePair();
        displayLastOp.textContent = `${firstDigit} ${currentOp}`;
        displayCurrentOp.textContent = '';
    } else {
    previousOp = operator;
    firstDigit = displayCurrentOp.textContent;
    displayLastOp.textContent = `${firstDigit} ${previousOp}`;
    displayCurrentOp.textContent = '';
    }
}

function calculatePair() {
    if (previousOp !== '' && displayCurrentOp.textContent === '') return;
    if (previousOp === '' && displayCurrentOp.textContent !== '') return;
    secondDigit = displayCurrentOp.textContent;
    displayCurrentOp.textContent = operate(previousOp, firstDigit, secondDigit);
    displayLastOp.textContent = '';
    firstDigit = displayCurrentOp.textContent;
    previousOp = currentOp;
    calcResult = 1;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    if (operator == '+') return add(a, b);
    if (operator == '-') return subtract(a, b);
    if (operator == '×') return multiply(a, b);
    if (operator == '÷') {
        if (b === 0) {
            return '∞';
        } else {
            return divide(a, b);
        }
    }
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