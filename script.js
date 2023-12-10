'use strict';

//Landscape mode code

const disapearContainer = document.querySelector('.disapearing-container');

const rightCalculatorButtons = document.querySelector('.right-calculator-buttons');

const buttonRightCalculatorButtons = document.querySelectorAll('.right-calculator-buttons button');

const leftCalculatorFeaturesI = document.querySelectorAll('.left-calculator-features i');

const calculatorFeatures = document.querySelector('.calculator-features');

const displayScreen = document.querySelector('.calculator-display-screen');

const rotateIcon = document.querySelector('[data-rotate-icon]');

rotateIcon.addEventListener('click', ()=>{

    displayScreen.classList.toggle('display-screen-padding');

    displayScreen.classList.toggle('wide-width');

    disapearContainer.classList.toggle('display');

    rightCalculatorButtons.classList.toggle('right-calc-property');

    buttonRightCalculatorButtons.forEach(button =>{
        button.classList.toggle('right-calc-button-property');
    });

    leftCalculatorFeaturesI.forEach(icon=>{
        icon.classList.toggle('property-of-left-feature-i');
    });

    calculatorFeatures.classList.toggle('property-of-features');
});

//Calculator second set of operations style code

const changeArrow = document.querySelector('[data-change-arrow]');

const rootButton = document.querySelector('[data-root]');
const sinButton = document.querySelector('[data-sin]');
const cosButton = document.querySelector('[data-cos]');
const tanButton = document.querySelector('[data-tan]');
const lnButton = document.querySelector('[data-ln]');
const logButton = document.querySelector('[data-log]');
const xButton = document.querySelector('[data-1x]');
const exButton = document.querySelector('[data-ex]');
const x2Button = document.querySelector('[data-x2]');
const xyButton = document.querySelector('[data-xy]');
const absxButton = document.querySelector('[data-abs-x]');
const piButton = document.querySelector('[data-pi]');
const eButton = document.querySelector('[data-e]');
let counter = 0;

changeArrow.addEventListener('click', ()=>{
    if(counter === 0){
        rootButton.innerHTML = '&#8731;';
        sinButton.innerHTML = 'sin<sup>-1</sup>';
        cosButton.innerHTML = 'cos<sup>-1</sup>';
        tanButton.innerHTML = 'tan<sup>-1</sup>';
        lnButton.innerHTML = 'sinh';
        logButton.innerHTML = 'cosh';
        xButton.innerHTML = 'tanh';
        exButton.innerHTML = 'sinh<sup>-1</sup>';
        x2Button.innerHTML = 'cosh<sup>-1</sup>';
        xyButton.innerHTML = 'tanh<sup>-1</sup>';
        absxButton.innerHTML = '2<sup>x</sup>';
        piButton.innerHTML = 'x<sup>3</sup>';
        eButton.innerHTML = 'x!';
        counter = 1;
    }
    else{
        rootButton.innerHTML = '&#8730;';
        sinButton.innerHTML = 'sin';
        cosButton.innerHTML = 'cos';
        tanButton.innerHTML = 'tan';
        lnButton.innerHTML = 'ln';
        logButton.innerHTML = 'log';
        xButton.innerHTML = '1/x';
        exButton.innerHTML = 'e<sup>x</sup>';
        x2Button.innerHTML = 'x<sup>2</sup>';
        xyButton.innerHTML = 'x<sup>y</sup>';
        absxButton.innerHTML = '|x|';
        piButton.innerHTML = '&#960;';
        eButton.innerHTML = 'e';
        counter= 0;
    }
});

//Portrait Calculator Functionality Code

const currOperand = document.querySelector('.curr-operand');
const resultDisplay = document.querySelector('.result');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const parenthesisButton = document.querySelector('[data-parenthesis]');
const negativeButton = document.querySelector('[data-negative]');
const equallButton = document.querySelector('[data-equall]');
const deleteIcon = document.querySelector('[data-delete]');
const greenX = document.querySelector('.bx-comment-x');

currOperand.innerHTML = '';
resultDisplay.innerHTML = '';

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        let nodes = currOperand.childNodes;
        let lastNode = nodes[nodes.length - 1];
        let firstNode;
        let operation;
        let computation;
        if(button.innerHTML === '.' && lastNode.nodeValue.includes('.'))return;
        currOperand.innerHTML = currOperand.innerHTML.toString() + button.innerHTML.toString();
        if(nodes.length - 2 >= 1){
            lastNode = (nodes[nodes.length - 1].nodeValue);
            if(lastNode.includes('(-')){
                lastNode = - Number(lastNode.slice(2));
            }
            else{
                lastNode = Number(lastNode);
            }
            operation = nodes[nodes.length - 2].innerHTML;
            if(resultDisplay.innerHTML === ''){
                firstNode = Number(nodes[nodes.length - 3].nodeValue);
            }
            else{
                firstNode = Number(resultDisplay.innerHTML);
            }

            switch(operation){
                case '+':
                    computation = firstNode + lastNode;
                    break;
                case '-':
                    computation = firstNode - lastNode;
                    break;
                case '*':
                    computation = firstNode * lastNode;
                    break;
                case '/':
                    computation = firstNode / lastNode;
                    break;
                case '%':
                    computation = firstNode % lastNode;
                    break;
            }
            resultDisplay.innerHTML = computation;
        }
        if(currOperand.innerHTML !== ''){
            greenX.classList.add('green-for-x');
        }
        if(resultDisplay.innerHTML === ''){
            currOperand.classList.remove('green-for-x');
        }
    });
});
operationButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        let nodes = currOperand.childNodes;

        if(currOperand.innerHTML === '')return;
        if(nodes[nodes.length - 1].innerHTML !== undefined)return;

        currOperand.innerHTML = currOperand.innerHTML.toString() + '<span>' + button.innerHTML.toString() + '</span>';
        let span = document.querySelectorAll('span');
        span.forEach(operation=>{
            operation.classList.add('green-for-x');
        })
        currOperand.classList.remove('green-for-x');
    })
})
negativeButton.addEventListener('click',()=>{
    let nodes = currOperand.childNodes;
    let lastNode = nodes[nodes.length - 1];
    if(nodes.length >= 1 && typeof(lastNode.nodeValue) === 'string'){
        if(lastNode.nodeValue.includes('(-')){
            lastNode.nodeValue = lastNode.nodeValue.slice(2);
            resultDisplay.innerHTML = '';
        }
        else{
            resultDisplay.innerHTML = -Number(lastNode.nodeValue);
            lastNode.nodeValue = '(-' + lastNode.nodeValue;
        }
        //lastNode.nodeValue = '(-' + lastNode.nodeValue;
        //currOperand.innerHTML = '(-'+currOperand.innerHTML;
    }
    else if(nodes.length >= 1 && typeof(nodes[nodes.length - 1].nodeValue) === 'object'){
        currOperand.innerHTML = currOperand.innerHTML + '(-';
    }
    else{
        return;
    }
})
equallButton.addEventListener('click',()=>{
    if(resultDisplay.innerHTML === '')return;
    else{
        currOperand.innerHTML = resultDisplay.innerHTML;
        resultDisplay.innerHTML = '';
        currOperand.classList.add('green-for-x');
    }
})
allClearButton.addEventListener('click',()=>{
    currOperand.innerHTML = '';
    resultDisplay.innerHTML = '';
    greenX.classList.remove('green-for-x');
    currOperand.classList.remove('green-for-x');
})
deleteIcon.addEventListener('click', ()=>{
    let span = currOperand.children;
    let nodes = currOperand.childNodes;
    if((span[span.length -1] !== undefined) && (nodes[nodes.length - 1].innerHTML !== undefined)){
        currOperand.removeChild(span[span.length - 1]);
    }
    else{
        currOperand.innerHTML = currOperand.innerHTML.toString().slice(0,-1);
    }
    if((currOperand.innerHTML === '') && (span[span.length -1] === undefined)){
        greenX.classList.remove('green-for-x');
        resultDisplay.innerHTML = '';
    }
    if(resultDisplay.innerHTML === ''){
        currOperand.classList.remove('green-for-x');
    }
})