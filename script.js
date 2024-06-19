const keys = document.querySelector('.calculator-keys');
const screen = document.querySelector('.calculator-screen');
const calculationDisplay = document.querySelector('.calculation');
const toggleDarkModeBtn = document.querySelector('.mode-btn');
let currentNumber = '0';
let previousNumber = '0';
let tempNumber = '';
let operator = '';
let calculationStr = '';
let resultDisplayed = false;
let togglePlusMinus = false;
let darkMode = true;

keys.addEventListener('click', (e) => {
  const { target } = e;
  const { value } = target;

  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '*':
    case '/':
    case '-':
    case '+':
      handleOperator(value);
      return;

    case '=':
      calculate();
      break;

    case 'all-clear':
      clear();
      return;

    case 'del':
      del();
      break;

    case 'frac':
      frac();
      break;

    case 'square':
      square();
      break;

    case '%':
      percentage();
      break;

    case 'square-root':
      squareRoot();
      break;

    case 'plus-minus':
      togglePlusMinusFunc();
      break;

    default:
      inputNumber(value);
      break;
  }

  updateScreen();
});

toggleDarkModeBtn.addEventListener('click', function (e) {
  const { target } = e;
  const button = target.closest('.mode-btn');
  const moonPath = button.querySelector('svg.moon path');
  const sunPath = button.querySelector('svg.sun path');

  if (moonPath && target.classList.contains('moon')) {
    if (darkMode) return;

    document.documentElement.style.setProperty('--drk-black', '#222831');
    document.documentElement.style.setProperty('--lgt-black', ' #31363f');
    document.documentElement.style.setProperty('--white', '#eeeeee');

    moonPath.style.stroke = '#fff';
    sunPath.style.stroke = '#aaa';

    darkMode = !darkMode;
  } else if (sunPath && target.classList.contains('sun')) {
    if (!darkMode) return;
    document.documentElement.style.setProperty('--drk-black', '#fafafa');
    document.documentElement.style.setProperty('--lgt-black', ' #fff');
    document.documentElement.style.setProperty('--white', '#000');

    moonPath.style.stroke = '#aaa';
    sunPath.style.stroke = '#000';

    darkMode = !darkMode;
  }
});

const defaultScreen = () => {
  if (currentNumber === '') {
    currentNumber = '0';
  }
};

const handleOperator = (nextOperator) => {
  if (operator && currentNumber === '') {
    operator = nextOperator;
    return;
  }

  if (previousNumber === '') {
    previousNumber = currentNumber;
    currentNumber = '';
  } else if (operator) {
    const result = calculate();
    currentNumber = String(result);
    previousNumber = currentNumber;
  }

  operator = nextOperator;
  displayCalculationDisplay();
};

const calculate = () => {
  let result = 0;
  const prev = parseFloat(previousNumber);
  const curr = parseFloat(currentNumber);

  if (isNaN(prev) || isNaN(curr)) {
    return;
  }

  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = prev / curr;
      break;
    default:
      return;
  }

  displayCalculationDisplay('=');
  currentNumber = String(result);
  operator = '';
  previousNumber = '';
  resultDisplayed = true;
  return result;
};

const inputNumber = (number) => {
  if (resultDisplayed || currentNumber === '0') {
    clear();
    currentNumber = number;
    resultDisplayed = false;
  } else {
    if (currentNumber.includes('.') && number === '.') {
      return;
    }

    currentNumber = currentNumber === '' ? number : currentNumber + number;
  }
};

const updateScreen = () => {
  adjustFontSize();
  screen.textContent = currentNumber;
};

const clear = () => {
  screen.textContent = '0';
  currentNumber = '';
  previousNumber = '';
  calculationDisplay.textContent = '';
  calculationStr = '';
  operator = '';
};

const del = () => {
  currentNumber = currentNumber.slice(0, -1);
  if (currentNumber === '0' || currentNumber === '') {
    defaultScreen();
  }
};

const displayCalculationDisplay = (symbol = '') => {
  if (symbol) {
    calculationStr += ` ${currentNumber} ${symbol}`;
    calculationDisplay.innerHTML = '';
    calculationDisplay.innerHTML = calculationStr;
  } else {
    calculationStr += `${previousNumber} <span class="red-accent">${operator}</span>`;
    calculationDisplay.innerHTML = calculationStr;
  }
};

const adjustFontSize = () => {
  const maxLength = 10;
  if (currentNumber.length > maxLength) {
    screen.style.fontSize = '2rem';
  } else {
    screen.style.fontSize = '3rem';
  }
};

const square = () => {
  currentNumber = String(currentNumber * currentNumber);
  resultDisplayed = true;
};

const squareRoot = () => {
  currentNumber = Math.sqrt(currentNumber);
  resultDisplayed = true;
};

const frac = () => {
  if (currentNumber === '0') {
    return;
  }
  currentNumber = String(1 / currentNumber);
  resultDisplayed = true;
};

const togglePlusMinusFunc = () => {
  if (currentNumber === '0') return;

  if (togglePlusMinus) {
    currentNumber = currentNumber.slice(1, currentNumber.length);
    togglePlusMinus = false;
  } else {
    currentNumber = '-' + currentNumber;
    togglePlusMinus = true;
  }
};

const percentage = () => {
  if (currentNumber === '') return;

  currentNumber = String(parseFloat(currentNumber) / 100);
  resultDisplayed = true;
};

// defaultScreen();
updateScreen();
