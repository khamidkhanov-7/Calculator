import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Calculator: React.FC = () => {
  const { t } = useLanguage();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '×': return firstValue * secondValue;
      case '÷': return firstValue / secondValue;
      default: return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const getButtonClass = (btn: string) => {
    const baseClass = "rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation";
    
    if (btn === 'C' || btn === '±' || btn === '%') {
      return `${baseClass} bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600`;
    }
    if (['+', '-', '×', '÷', '='].includes(btn)) {
      return `${baseClass} bg-blue-500 hover:bg-blue-600 text-white shadow-lg`;
    }
    return `${baseClass} bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md`;
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-gray-700">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center">
        {t.calculatorTitle}
      </h2>
      
      <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="text-right text-2xl sm:text-3xl font-mono text-gray-800 dark:text-white overflow-hidden break-all">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {buttons.flat().map((btn, index) => (
          <button
            key={index}
            className={`${getButtonClass(btn)} ${btn === '0' ? 'col-span-2' : ''} h-12 sm:h-16`}
            onClick={() => {
              if (btn === 'C') clear();
              else if (btn === '=') handleEquals();
              else if (['+', '-', '×', '÷'].includes(btn)) performOperation(btn);
              else if (btn === '.') inputDecimal();
              else if (!isNaN(parseInt(btn))) inputNumber(btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;