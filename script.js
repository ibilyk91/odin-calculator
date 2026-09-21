function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if (num2 === 0){
        return null;
    }
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

function round(result){ // round long decimals to 8 decimal places
    if (result === null){ // for zero division
        return null;
    }
    return Math.round(result * 100000000) / 100000000;
}

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

function update_display(input){
    if (input === null){ // for zero division
        display.textContent = "Error";
        return;
    }
    display.textContent = String(input);
}

const MAX_DIGITS = 10;

let input = '0';
let num1 = null;
let operator = null;
let waiting = false; // waits for second value

buttons.addEventListener("click", function(event){
    const target = event.target; // store button clicked, target = <button class="btn_number" data-value="7">7</button>

    if (!target.matches("button")){
        return; // ignore click which was not on a button
    }

    if (target.classList.contains("btn_number")){ // if a btn_number clicked
        const value = target.dataset.value; // store data-value content into value

        if (waiting){
            if (value === '.'){ // make input "0." if waiting for a new number and user clicks '.'
                input = "0.";
            }
            else{
                input = value;
            }
            waiting = false; // when finished writing number
        }
        else{
            if (value === '.' && input.includes('.')){ // ignore click if it is a '.' and it already exists in input
                return;
            }

            if (input.replace('.', '').length >= MAX_DIGITS){ // delete any '.' and check if input length is >= MAX_DIGITS if so stop new numbers
                return;
            }

            if (input === '0' && value === '.'){ // if 0 and user types '.' change input to "0."
                input = "0.";
            }
            else{ // numbers with two or more digits
                input = (input === '0') ? value : input + value; // if condition true assign value, if not append value to input.
            }
        }    
        update_display(input);
    }

    else if (target.classList.contains("btn_operator")){ // if a btn_action clicked
        const action = target.dataset.action; // store data-action content into action

        if (action === "AC"){ // clear
            input = '0';
            num1 = null;
            operator = null;
            waiting = false;
            update_display(input);
        }
        else if (action === "DEL"){
            if (waiting){ // if waiting for an input (right after operator or equals)
                return; // ignore
            }

            if (input.length > 1){
                input = input.slice(0, -1); // remove last character
            }
            else{
                input = '0'; // reset to 0 if one digit is left to avoid empty display
            }
            update_display(input);
        }
        else if (action === '='){
            if (operator && num1 !== null){
                const num2 = Number.parseFloat(input); // convert string to number
                const result = operate(num1, num2, operator);

                input = round(result);
                num1 = null;
                operator = null;
                waiting = true;
                update_display(input);
            }
        }
        else{ // for '+', '-', '*', '/'
            const num2 = Number.parseFloat(input);

            if ((num1 !== null) && operator && !waiting){
                const result = operate(num1, num2, operator); // calculate and save raw value
                num1 = result; // store number in "memory"

                input = round(result);
                update_display(input);
            }
            else{
                num1 = num2;
            }
            operator = action;
            waiting = true;
        }
    }
});
