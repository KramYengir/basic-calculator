/////////////////////////
// Our global variables//
/////////////////////////
let numA = '0';
let numB = '';
let latestOperator = '';
let upperDisplay;
let mainDisplay = '0';

let isOnSecondNum = false;
isUpperLineActive = false;


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
    if(mainDisplay.length >= 6) return;
    
    if(mainDisplay == '0'){
        mainDisplay = num;
    }
    else{
        mainDisplay += num;
    }

    updateDisplay();
}

const processOperator = function(operator){
    console.log('Operator Clicked');
    
    if(isOnSecondNum){
        console.log('We will operate');
    }
    else if(!isUpperLineActive){
        latestOperator = operator;
        numA = mainDisplay;
        mainDisplay = '0';
        isUpperLineActive = true;
    }
    else{
        latestOperator = operator;
    }
    
    updateDisplay();
}

const processFunction = function(functionType){
    console.log('Function Clicked');
    if(functionType == 'AC'){
        mainDisplay = '0';
        numA = '0';
        numB = '';
        latestOperator = '';

    }


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
    upperDisplay = `${numA} ${latestOperator} ${numB}`;
    displayTopLine.innerText = upperDisplay;
    displayBottomLine.innerText = mainDisplay;
}



// Refresh the display on page load
updateDisplay();


