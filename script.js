let previousNum = '0';
let latestNum = '';
let latestOperator = '';
let display = `${previousNum} ${latestOperator} ${latestNum}`;

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
    /* display = previousNum+latestOperator+latestNum;
    displayDiv.innerText = display; */
}

const buttons = document.querySelectorAll('.button');
const buttonsArray = Array.from(buttons);

buttonsArray.forEach((button) => {
    button.addEventListener('click', ()=>{
        processButtonClick(button);
    })
})

const processButtonClick = function(button){
    if(button.className == 'button operator'){
        console.log('Operator Clicked');
    }
    else if(button.className == 'button function'){
        console.log('Function Clicked');
    }
    else{
        console.log('Number Clicked');
    }
}


