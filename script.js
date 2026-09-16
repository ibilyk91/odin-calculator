function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){ // complete 0 division
    return num1 / num2;
}

function operate(num1, num2, operator){
    if (operator === '+'){
        return add(num1, num2);
    }
    else if (operator === '-'){
        return subtract(num1, num2);
    }
    else if (operator === '*'){
        return multiply(num1, num2);
    }
    else if (operator === '/'){
        return divide(num1, num2);
    }
}

const display = document.getElementsByClassName("display");
const buttons = document.querySelector(".buttons");

function update_display(input){
    display.textContent = input;
}

let input = '0';

buttons.addEventListener("click", function(event){
    const target = event.target; // store button clicked, target = <button class="btn_number" data-value="7">7</button>

    if (!target.matches("button")){
        return; // ignore click which was not on a button
    }

    // if number button {}

    // if operator button {}
});

