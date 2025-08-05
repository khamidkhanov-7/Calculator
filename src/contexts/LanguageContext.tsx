import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translation } from '../types';

const translations: Record<Language, Translation> = {
  en: {
    calculator: 'Calculator',
    currency: 'Currency',
    datetime: 'Date & Time',
    clear: 'Clear',
    equals: 'Equals',
    result: 'Result',
    error: 'Error',
    calculatorTitle: 'Standard Calculator',
    currencyTitle: 'Currency Converter',
    from: 'From',
    to: 'To',
    amount: 'Amount',
    convert: 'Convert',
    exchangeRate: 'Exchange Rate',
    datetimeTitle: 'Date & Time Calculator',
    startDate: 'Start Date & Time',
    endDate: 'End Date & Time',
    calculate: 'Calculate',
    timeDifference: 'Time Difference',
    years: 'Years',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    createdBy: 'Created by Khamidkhanov'
  },
  ru: {
    calculator: 'Калькулятор',
    currency: 'Валюта',
    datetime: 'Дата и Время',
    clear: 'Очистить',
    equals: 'Равно',
    result: 'Результат',
    error: 'Ошибка',
    calculatorTitle: 'Стандартный Калькулятор',
    currencyTitle: 'Конвертер Валют',
    from: 'Из',
    to: 'В',
    amount: 'Сумма',
    convert: 'Конвертировать',
    exchangeRate: 'Курс обмена',
    datetimeTitle: 'Калькулятор Даты и Времени',
    startDate: 'Начальная Дата и Время',
    endDate: 'Конечная Дата и Время',
    calculate: 'Вычислить',
    timeDifference: 'Разница во Времени',
    years: 'Лет',
    days: 'Дней',
    hours: 'Часов',
    minutes: 'Минут',
    seconds: 'Секунд',
    darkMode: 'Темная Тема',
    lightMode: 'Светлая Тема',
    createdBy: 'Создано Хамидхановым'
  },
  uz: {
    calculator: 'Kalkulyator',
    currency: 'Valyuta',
    datetime: 'Sana va Vaqt',
    clear: 'Tozalash',
    equals: 'Teng',
    result: 'Natija',
    error: 'Xato',
    calculatorTitle: 'Standart Kalkulyator',
    currencyTitle: 'Valyuta Konvertori',
    from: 'Dan',
    to: 'Ga',
    amount: 'Miqdor',
    convert: 'Konvertatsiya',
    exchangeRate: 'Ayirboshlash kursi',
    datetimeTitle: 'Sana va Vaqt Kalkulyatori',
    startDate: 'Boshlang\'ich Sana va Vaqt',
    endDate: 'Oxirgi Sana va Vaqt',
    calculate: 'Hisoblash',
    timeDifference: 'Vaqt Farqi',
    years: 'Yil',
    days: 'Kun',
    hours: 'Soat',
    minutes: 'Daqiqa',
    seconds: 'Soniya',
    darkMode: 'Qorong\'u Rejim',
    lightMode: 'Yorug\' Rejim',
    createdBy: 'Xamidxanov tomonidan yaratilgan'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};