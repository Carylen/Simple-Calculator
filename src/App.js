import { useState } from 'react';
import './style/GridNumber.css';

function App() {

  const [displayValue, setDisplayValue] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleInput = (input) => {
    if (input === 'C') {
      clear();
    } else if (!isNaN(input)) {
      if (waitingForOperand) {
        setDisplayValue(String(input));
        setWaitingForOperand(false);
      } else {
        setDisplayValue(displayValue === '0' ? String(input) : displayValue + input);
      }
    } else if (input === '.') {
      if (waitingForOperand) {
        setDisplayValue('0.');
        setWaitingForOperand(false);
      } else if (displayValue.indexOf('.') === -1) {
        setDisplayValue(displayValue + '.');
      }
    } else if (input === '=') {
      if (operator) {
        calculate();
      }
    } else {
      if (operator) {
        calculate();
      }
      setPrevValue(displayValue);
      setWaitingForOperand(true);
      setOperator(input);
    }
  };

  const clearState = () => { //untuk reduce penulisan kode secara berulang
    setPrevValue(null);
    setOperator(null);
  }

  const calculate = () => {
    const currentValue = parseFloat(displayValue);
    const prev = parseFloat(prevValue);

    if (operator === '+') {
      setDisplayValue(String(prev + currentValue));
      clearState();
    } else if (operator === '-') {
      setDisplayValue(String(prev - currentValue));
      clearState();
    } else if (operator === 'x') {
      setDisplayValue(String(prev * currentValue));
      clearState();
    } else if (operator === '/') {
      setDisplayValue(String(prev / currentValue));
      clearState();
    }
  };

  const clear = () => {
    setDisplayValue('0');
    clearState();
    setWaitingForOperand(false);
  };

  return (
      <div className='container'>
        <input className='display' value={displayValue}></input>
        <button className='special-span' onClick={() => handleInput('C')}>AC</button>
        <button onClick={() => handleInput('/')}>%</button>
        <button onClick={() => handleInput('/')}>&divide;</button>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleInput('x')}>&times;</button>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleInput('+')}>+</button>
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleInput('-')}>-</button>
        <button className='special-span' onClick={() => handleInput('0')}>0</button>
        <button onClick={() => handleInput('.')}>.</button>
        <button onClick={() => handleInput('=')}> = </button>
      </div>
  );
}

export default App;
