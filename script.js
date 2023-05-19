/////////////////////////
// Our global variables//
/////////////////////////
let numA = '0';
let numB = '';
let latestOperator = '';
let upperDisplay = '';
let mainDisplay = '0';

let isOnSecondNum = false;
let haveJustOperated = false;
let hasErrorDisplayed = false;

const operatorList = ['/', '*', '-', '+', '='];

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

    if(hasErrorDisplayed) reset();

    if(haveJustOperated) reset();

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

    let isValidOperator = false;

    operatorList.forEach( (value)=>{
        if(value == operator){
            isValidOperator = true;
        }
    })

    if(!isValidOperator) return;

    console.log('Operator Clicked');

    if(hasErrorDisplayed) reset();
    
    if(isOnSecondNum){
        //any operator acts as = at this point
        if(!haveJustOperated){
            if(operator == '='){
                numB = mainDisplay;
                mainDisplay = operate(Number(numA), Number(numB), latestOperator);
                upperDisplay = `${numA} ${latestOperator} ${numB} =`;
                haveJustOperated = true;
            }
            else{
                numB = mainDisplay;
                numA = operate(Number(numA), Number(numB), latestOperator);
                upperDisplay = `${numA} ${operator} `;
                mainDisplay = '0';
                latestOperator =operator;
            }
            

        }
        else if(operator == '=') return;
        else{
            haveJustOperated = false;
            latestOperator = operator;
            numA = mainDisplay;
            mainDisplay = '0';
            isOnSecondNum = true;
            upperDisplay = `${numA} ${latestOperator} `;
        }
        
    }
    else if(operator == '=') return;
    else{
        latestOperator = operator;
        numA = mainDisplay;
        mainDisplay = '0';
        isOnSecondNum = true;
        upperDisplay = `${numA} ${latestOperator} `;
    }
    
    updateDisplay();
}

const processFunction = function(functionType){
    console.log('Function Clicked');

    if(hasErrorDisplayed) reset();

    switch(functionType){
        case 'AC':
            reset();
            break;
        case 'C':
            cancel();
            break;
        case '+/-':
            switchSign();
            break;
        case '.':
            addDecimal();
            break;
        case '%':
            addPercentage();
            break;
    }

    updateDisplay();
}

// Clear everything
const reset = function(){
    mainDisplay = '0';
    numA = '0';
    numB = '';
    latestOperator = '';
    upperDisplay = '';
    isOnSecondNum = false;
    haveJustOperated = false;
    hasErrorDisplayed = false;
    console.log('have resetted')
    
}

const cancel = function(){
    if(mainDisplay == '0') return;

    if(mainDisplay.length == 1){
        mainDisplay = '0';
        return;
    } 

    mainDisplay = mainDisplay.substring(0,mainDisplay.length -1);
}

const addDecimal = function(){
    if(mainDisplay.length >= 6) return;
    if(mainDisplay.includes('.')) return;
    if(mainDisplay == '0'){
        mainDisplay = '0.';
        return;
    }

    mainDisplay += '.';
}

const switchSign = function(){
    if(mainDisplay == '0') return;
    if(mainDisplay.includes('-')){
        mainDisplay = mainDisplay.substring(1);
        return;
    }
    else{
        mainDisplay = '-'+mainDisplay;
    }
}

const addPercentage = function(){
    if(mainDisplay.length >= 6) return;

    let num = Number(mainDisplay);

    mainDisplay = num * 0.01;
    mainDisplay = String(mainDisplay);
    if(mainDisplay.length >= 6){
        mainDisplay = "ERROR!";
        hasErrorDisplayed = true;
    } 
}


// Function to perform the operation
const operate = function(a, b, operator){
    let result;
    
    switch(operator){
        case '+':
            result = a+b;
            break;
        case '-':
            result =  a-b;
            break;
        case '*':
            result =  a*b;
            break;
        case '/':
            result =  a/b;
            break;
        default:
            result =  0;
            break;
    }

    return Math.round((result + Number.EPSILON) * 100) / 100;
}

//testing keyboard input
document.addEventListener('keyup', (e) =>{
    console.log(e.key);

    if(!isNaN(e.key)){
        processNumber(e.key);
    }
    else if(e.key == 'Enter'){
        processOperator('=');
    }
    else(
        processOperator(e.key)
    )
})


//Simple function which refreshes the display
const updateDisplay = function(){
    displayTopLine.innerText = upperDisplay;
    displayBottomLine.innerText = mainDisplay;
}



// Refresh the display on page load
updateDisplay();


