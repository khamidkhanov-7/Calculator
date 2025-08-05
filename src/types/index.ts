export interface Translation {
  // Navigation
  calculator: string;
  currency: string;
  datetime: string;
  
  // Common
  clear: string;
  equals: string;
  result: string;
  error: string;
  
  // Calculator
  calculatorTitle: string;
  
  // Currency
  currencyTitle: string;
  from: string;
  to: string;
  amount: string;
  convert: string;
  exchangeRate: string;
  
  // DateTime
  datetimeTitle: string;
  startDate: string;
  endDate: string;
  calculate: string;
  timeDifference: string;
  years: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  
  // Theme
  darkMode: string;
  lightMode: string;
  
  // Footer
  createdBy: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export type Language = 'en' | 'ru' | 'uz';
export type Theme = 'light' | 'dark';