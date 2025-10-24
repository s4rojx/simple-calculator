document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            // Number or decimal point
            if (!isNaN(value) || value === '.' || value === '00') {
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
                updateDisplay();
            }
            // Clear
            else if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operation = null;
                updateDisplay();
            }
            // Delete
            else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
            }
            // Operators
            else if (['+', '-', '*', '/', '%'].includes(value)) {
                if (currentInput === '') return;
                if (previousInput !== '') {
                    calculate();
                }
                operation = value;
                previousInput = currentInput;
                currentInput = '';
                updateDisplay();
            }
            // Equals
            else if (value === '=') {
                calculate();
            }
        });
    });

    function updateDisplay() {
        if (operation) {
            display.value = `${previousInput} ${operation} ${currentInput}`;
        } else {
            display.value = currentInput;
        }
    }

    function calculate() {
        if (previousInput === '' || currentInput === '') return;
        
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch(operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = prev / current; break;
            case '%': result = prev % current; break;
            default: return;
        }

        currentInput = result.toString();
        previousInput = '';
        operation = null;
        updateDisplay();
    }
});