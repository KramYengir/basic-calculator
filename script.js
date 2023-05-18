/////////////////////////
// Our global variables//
/////////////////////////
let numA = '0';
let numB = '';
let latestOperator = '';
let display = `${numA} ${latestOperator} ${numB}`;

let numberClicked = false;

////////////////////
//Our DOM Elements//
////////////////////
const displayTopLine = document.querySelector('.display-top-line');
const displayBottomLine = document.querySelector('.display-bottom-line');

const buttons = document.querySelectorAll('.button');
const buttonsArray = Array.from(buttons);

// Add EventListeners to each button

buttonsArray.forEach((button) => {
    button.addEventListener('click', ()=>{
        if(button.className == 'button operator'){
            processOperator(button.textContent);
        }
        else if(button.className == 'button function'){
            processFunction(button.textContent);
        }
        else{
            processNumber(button.textContent);            
        }
    })
})
//////////////////
// Our Functions//
//////////////////
const processNumber = function(num){
    console.log('Number Clicked');
    if(numberClicked){
        numB = num;
    }
    else{
        numA = num;
        numberClicked = true;
    } 
    updateDisplay();
}

const processOperator = function(operator){
    console.log('Operator Clicked');
    latestOperator = operator;
    updateDisplay();
}

const processFunction = function(functionType){
    console.log('Function Clicked');
    updateDisplay();
}

// Function to perform the operation
const operate = function(a, b, operator){
    switch(operator){
        case '+':
            return a+b;
        case '-':
            return a-b;
        case '*':
            return a*b;
        case '/':
            return a/b;
        default:
            return 0;
    }
}

//Simple function which refreshes the display
const updateDisplay = function(){
    display = numA+latestOperator+numB;
    displayTopLine.innerText = display;
}



// Refresh the display on page load
updateDisplay();


