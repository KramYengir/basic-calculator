let numA = '0';
let numB = '';
let latestOperator = '';
let display = `${numA} ${latestOperator} ${numB}`;

let numberClicked = false;

const displayTopLine = document.querySelector('.display-top-line');
const displayBottomLine = document.querySelector('.display-bottom-line');

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

const updateDisplay = function(){
    display = numA+latestOperator+numB;
    displayTopLine.innerText = display;
}

const buttons = document.querySelectorAll('.button');
const buttonsArray = Array.from(buttons);

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

updateDisplay();


