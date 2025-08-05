import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Clock } from 'lucide-react';

const DateTimeCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [result, setResult] = useState<{
    years: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end < start) {
      alert(t.error);
      return;
    }

    const diffInMs = end.getTime() - start.getTime();
    
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365.25);

    setResult({
      years,
      days,
      hours,
      minutes,
      seconds
    });
  };

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-gray-700">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center">
        {t.datetimeTitle}
      </h2>

      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar size={14} className="sm:w-4 sm:h-4" />
              {t.startDate}
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar size={14} className="sm:w-4 sm:h-4" />
              {t.endDate}
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={calculateDifference}
            disabled={!startDate || !endDate}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 touch-manipulation text-sm sm:text-base"
          >
            <Clock size={18} className="sm:w-5 sm:h-5" />
            {t.calculate}
          </button>
        </div>

        {result && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4 sm:p-6 border border-emerald-200 dark:border-emerald-800">
            <h3 className="text-base sm:text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-4 text-center">
              {t.timeDifference}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
              <div className="text-center p-2 sm:p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 break-all">
                  {result.years.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t.years}</div>
              </div>
              
              <div className="text-center p-2 sm:p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 break-all">
                  {result.days.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t.days}</div>
              </div>
              
              <div className="text-center p-2 sm:p-3 bg-white/50 dark:bg-black/20 rounded-lg col-span-2 sm:col-span-1">
                <div className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 break-all">
                  {result.hours.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t.hours}</div>
              </div>
              
              <div className="text-center p-2 sm:p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 break-all">
                  {result.minutes.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t.minutes}</div>
              </div>
              
              <div className="text-center p-2 sm:p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 break-all">
                  {result.seconds.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t.seconds}</div>
              </div>
            </div>

            {startDate && endDate && (
              <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center break-all">
                  {formatDateTime(startDate)} → {formatDateTime(endDate)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateTimeCalculator;