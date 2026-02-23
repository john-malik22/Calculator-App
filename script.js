let expression = "";
let buttons = document.querySelectorAll('.button');
let screen = document.querySelector('input');

function updateScreen() {
    screen.value = expression;
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

function clearAll(){
    expression ="";
    updateScreen();
}

function backspace() {
    expression = expression.slice(0, -1);
    updateScreen();
}

function calculate(){
    try{
        expression = eval(expression);
        updateScreen();
    } catch {
        expression= ""
        screen.value = "Error";
    }
}
function handleInput(value) {
    if (value === '=') return calculate();
    if (value === 'A') return clearAll();
    if (value === 'C') return backspace();

    let lastchar = expression[expression.length - 1];

    if (isOperator(lastchar) && isOperator(value)){
        expression = expression.slice(0, -1) + value;
    }
    else if (expression === "" && isOperator(value) && value !== '-'){
        return;
    }
    else {
        expression += value;
    }
    updateScreen();
}
            
buttons.forEach((button) => {
    button.addEventListener('click', (e) =>{
        let value = e.target.dataset.value || e.target.innerHTML;
        handleInput(value);
    });
});
 
document.addEventListener('keydown', (e) =>{
    e.preventDefault();
    let key = e.key;

    const keyMap = {
        'Enter': '=',
        'Backspace': 'C',
        'Delete': 'A',
        '*': '*',
        '/': '/',
        '+': '+',
        '-': '-',
        '%': '%',
        '.': '.'
    }
    if (!isNaN(key)) {
        handleInput(key);
        return;
    }
    if (keyMap[key]) {
        handleInput(keyMap[key]);
    }
})