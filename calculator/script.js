const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const squareRootButton = document.querySelector('[data-square-root]');
const exponentiationButton = document.querySelector('[data-exponentiation]');
const equalsButton = document.querySelector('[data-equals]');
const previousValue = document.querySelector('[data-previous-operand]');
const currentValue = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousValue, currentValue){
        this.currentValue = currentValue;
        this.previousValue = previousValue;
        this.resultReset = true;
        this.operation;
    }
    clear = () => {
        this.currentValue.innerText = '';
        this.previousValue.innerText = '';
        this.resultReset = true;
        this.operation = undefined;
}
    delete = () => {
        this.currentValue.innerText = this.currentValue.innerText.slice(0, -1);
    }
    addCurrentNumber = (value) => {
        if(value === '.' && this.currentValue.innerText.includes('.')) return;
        if(value === '.' && this.currentValue.innerText === '') return;
        if(this.currentValue.innerText === '0' && value === '0') return
        if(this.currentValue.innerText === '0' && value !== '.') {
            this.currentValue.innerText = '' 
        }
        if(this.resultReset === false){
            this.currentValue.innerText = ''  
        }
        this.currentValue.innerText += value
        this.resultReset = true;
    }
    addOperationValue = (value) => {
       if(this.currentValue.innerText === '-') return
       if(this.previousValue.innerText === '' && this.currentValue.innerText === '' &&  value !== '-') return;
       if(this.previousValue.innerText !== '' && this.currentValue.innerText === '' &&  value !== '-' && this.operation) return;
       else if(!this.operation && this.previousValue.innerText === '' && this.currentValue.innerText === '' && value === '-'){
        this.currentValue.innerText += value; 
       }
       else if(this.operation && this.previousValue.innerText !== '' && this.currentValue.innerText === '' && value === '-'){
            this.currentValue.innerText += value; 
       }
       else if(this.operation && this.previousValue.innerText !== '' && this.currentValue.innerText !== ''){ 
        this.showResult()
        this.previousValue.innerText += this.currentValue.innerText + value;
        this.currentValue.innerText = '';
        this.operation = value;
       }
        else{ 
        this.previousValue.innerText += this.currentValue.innerText + value;
        this.currentValue.innerText = '';
        this.operation = value;
       }
    }
     
    getSquareRoot = () => {
        const result = Math.sqrt(this.currentValue.innerText);
        if(isNaN(result)){
            this.currentValue.innerText =  'Error';
            this.previousValue.innerText = '';
            this.resultReset = false;
        }else{
            this.currentValue.innerText =  Math.sqrt(this.currentValue.innerText);
            this.previousValue.innerText = '';
            this.resultReset = false;
        }
        
    }
    showResult = () => {
        if(this.previousValue.innerText !== '' && this.currentValue.innerText ==='' && this.operation) return;
        this.prev = parseFloat(this.previousValue.innerText);
        this.curr = parseFloat(this.currentValue.innerText);
        if(this.operation === '+'){
            this.currentValue.innerText = parseFloat((this.prev + this.curr).toPrecision(12));
        }
        if(this.operation === '-'){
            this.currentValue.innerText = parseFloat((this.prev - this.curr).toPrecision(12));
        }
        if(this.operation === '/'){
            this.currentValue.innerText = parseFloat((this.prev / this.curr).toPrecision(12));
        }
        if(this.operation === '*'){
            this.currentValue.innerText = parseFloat((this.prev * this.curr).toPrecision(12));
        }
        if(this.operation === '^'){
            this.currentValue.innerText = this.prev ** this.curr;
        }
        console.log(this.operation)
        this.previousValue.innerText = '';
        this.operation = undefined;
        this.resultReset = false;
    }
}

const calculator = new Calculator(previousValue, currentValue)

numberButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        calculator.addCurrentNumber(e.target.innerText)
    })
})
operationButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        calculator.addOperationValue(e.target.innerText)
    })
})

clearButton.addEventListener('click', () => {
    calculator.clear();
})

equalsButton.addEventListener('click', () => {
    calculator.showResult();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
})

squareRootButton.addEventListener('click', () => {
    calculator.getSquareRoot();
})