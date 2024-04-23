function displayNumber(num) {
    if (canType == true) {
        var result = document.getElementById("screen");
        result.value += num;
    }
}
function reset() {
    var screen = document.getElementById("screen");
    screen.value = null;
    storedOperator = null;
    storedValue = null;
    decimal = false;
    negative = false;
    percentage = false;
    canType = true;
    equalsLastInput = false;
}
function clearScreen() {
    var screen = document.getElementById("screen");
    if (screen.value != '' && equalsLastInput == false) {
        var result = document.getElementById("screen");
        result.value = '';
        canType = true;
        percentage = false;
        decimal = false;
    } else {
        reset()
    }
}
function decimalCheck() {
    if (decimal == false) {
        displayNumber(".")
        decimal = true;
    }
}
function plusMinus() {
    var result = document.getElementById("screen");
    if (negative == false) {
        result.value = "-" + result.value;
        negative = true;
    } else {
        result.value = result.value.slice(1);
        negative = false;
    }
    
}
function percent() {
    var result = document.getElementById("screen");
    if (percentage == false) {
        result.value += "%";
        percentage = true;
        canType = false;
    } else {
        result.value = result.value.slice(0, -1);
        percentage = false;
        canType = true;
    }
}
function storeValue() {
    var screen = document.getElementById("screen");
    if (percentage == true) {
        screen.value = screen.value.slice(0, -1);
        storedValue = parseFloat(screen.value);
        storedValue = storedValue / 100;
    } else {
        storedValue = parseFloat(screen.value);
    }
    clearScreen();
}
function operator(operator) {
    equalsLastInput = false;
    screen = document.getElementById("screen");
    if (screen.value == null || (percentage == true && (operator == "-" || operator == "+"))) {
        return;
    }
    canType = true;

    if (storedOperator == null) {
        storeValue();
        storedOperator = operator;
    } else {
        calculate();
        storedOperator = operator;
        clearScreen();
    }
}
function calculate() {
    var screen = document.getElementById("screen");
    var currentValue = parseFloat(screen.value);
    switch (storedOperator) {
        case "+":
            storedValue += currentValue;
            break;
        case "-":
            storedValue -= currentValue;
            break;
        case "*":
            storedValue *= currentValue;
            break;
        case "/":
            storedValue /= currentValue;
            break;
    }
    storedOperator = null;
    percentage = false;
    negative = false;
}
function equals() {
    calculate();
    var screen = document.getElementById("screen");
    screen.value = storedValue;
    if(storedValue < 0) {
        negative = true
    }
    canType = false;
    equalsLastInput = true;
}
equalsLastInput = false;
storedOperator = null;
var storedValue = null;
decimal = false;
negative = false;
percentage = false;
canType = true;