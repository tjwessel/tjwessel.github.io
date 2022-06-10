let currentNum = "0";
let storedNum = null;
let operator;
let isOperatorActive = false;
let isEqualsActive = false;
let isDecimalActive = false;

// Basic operations
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
// Calls function based on whichever operator is currently active
function operate(a, b) {
    return window[operator](a, b);
}




// Number buttons - add to display. Nine digit max
let display = document.querySelector("#display");
let numBtns = document.querySelectorAll(".num");
numBtns.forEach(numBtn => numBtn.addEventListener('click', (e) => addDigit(e.target.innerText)));
function addDigit (digit) {
    if (currentNum.length < 9) {
        if (currentNum === "0") {
            currentNum = digit;
            clearBtn.innerText = "C";
            isEqualsActive = false;
        } else {
            currentNum += digit;
        }
        display.innerText = addCommas(currentNum);
        fitDisplayText(currentNum.length);
    }
}

//Decimal button
let decimalBtn = document.querySelector("#decimal");
decimalBtn.addEventListener('click', () => {
    if (!isDecimalActive) {
        currentNum += ".";
        isDecimalActive = true;
        display.innerText = addCommas(currentNum);
        fitDisplayText(currentNum.length);
        isEqualsActive = false;
    }
});

// Changes display font size up to nine digits
function fitDisplayText(length) {
    switch (length) {
        case 7:
            display.removeAttribute("class");
            display.classList.add("sevenDig");
            break;
        case 8:
            display.removeAttribute("class");
            display.classList.add("eightDig");
            break;
        case 9:
            display.removeAttribute("class");
            display.classList.add("nineDig");
            break;
        default:
            display.removeAttribute("class");
            display.classList.add("sixDig");
            break;
    }
}

// Add commas from end or from decimal place
function addCommas(stringNum) {
    let numSplit = stringNum.split("");
    if (isDecimalActive) {
        for (let i = stringNum.indexOf(".") - 3; i > 0; i -= 3) {
            numSplit.splice(i, 0, ",");
        }
    } else {
        for (let i = stringNum.length - 3; i > 0; i -= 3) {
            numSplit.splice(i, 0, ",");
        }
    }
    return numSplit.join("");
    
}

// Changes display font size up to nine digits
function fitDisplayText(length) {
    switch (length) {
        case 7:
            display.removeAttribute("class");
            display.classList.add("sevenDig");
            break;
        case 8:
            display.removeAttribute("class");
            display.classList.add("eightDig");
            break;
        case 9:
            display.removeAttribute("class");
            display.classList.add("nineDig");
            break;
        default:
            display.removeAttribute("class");
            display.classList.add("sixDig");
            break;
    }
}

// All operator buttons
let operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach(operatorBtn => operatorBtn.addEventListener('click', (e) => {
    if (!isOperatorActive) {
        if (!isEqualsActive) storedNum = +currentNum;
        operator = e.target.dataset.operation;
        currentNum = "0";
        isOperatorActive = true;
        isDecimalActive = false;
    } else if (isOperatorActive) {
        storedNum = operate(storedNum, +currentNum);
        display.innerText = addCommas(storedNum.toString());
        fitDisplayText(storedNum.toString().length);
        currentNum = "0";
        isDecimalActive = false;
        operator = e.target.dataset.operation;
    }
    
}))

// Clear button
let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', () => {
    currentNum = "0";
    display.innerText = currentNum;
    storedNum = null;
    isOperatorActive = false;
    isDecimalActive = false;
    display.removeAttribute("class");
    display.classList.add("sixDig");
    clearBtn.innerText = "AC";
})

// Equals button
let equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', () => {
    if (isOperatorActive) {
        storedNum = operate(storedNum, +currentNum);
        display.innerText = addCommas(storedNum.toString());
        fitDisplayText(storedNum.toString().length);
        currentNum = "0";
        isOperatorActive = false;
        isDecimalActive = false;
        isEqualsActive = true;
    }
})

