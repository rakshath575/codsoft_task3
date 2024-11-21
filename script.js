document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = null;
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                currentInput = '';
                operator = null;
                firstOperand = null;
                display.textContent = '0';
                removeActiveClass();
            } else if (value === '=') {
                if (operator && firstOperand !== null) {
                    currentInput = operate(firstOperand, parseFloat(currentInput), operator).toString();
                    display.textContent = currentInput;
                    operator = null;
                    firstOperand = null;
                    removeActiveClass();
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    operator = value;
                    firstOperand = parseFloat(currentInput);
                    currentInput = '';
                    removeActiveClass();
                    button.classList.add('operation-active');
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
                if (operator) {
                    removeActiveClass();
                }
            }
        });
    });

    function operate(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    }

    function removeActiveClass() {
        buttons.forEach(btn => {
            btn.classList.remove('operation-active');
        });
    }
});
