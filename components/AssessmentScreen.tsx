
import React, { useEffect, useState } from 'react';
import { Question } from '../types';

interface AssessmentScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (value: number) => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}) => {
  const [animating, setAnimating] = useState(false);
  const progress = ((currentIndex) / totalQuestions) * 100;

  // Reset animation when question changes
  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleOptionClick = (value: number) => {
    onAnswer(value);
  };

  const options = [
    { value: 1, label: "非常不同意", color: "bg-slate-100 hover:bg-red-100 border-slate-200 hover:border-red-300 text-slate-600 hover:text-red-700" },
    { value: 2, label: "不同意", color: "bg-slate-100 hover:bg-orange-100 border-slate-200 hover:border-orange-300 text-slate-600 hover:text-orange-700" },
    { value: 3, label: "中立", color: "bg-slate-100 hover:bg-slate-200 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800" },
    { value: 4, label: "同意", color: "bg-slate-100 hover:bg-brand-100 border-slate-200 hover:border-brand-300 text-slate-600 hover:text-brand-700" },
    { value: 5, label: "非常同意", color: "bg-slate-100 hover:bg-brand-200 border-slate-200 hover:border-brand-500 text-slate-600 hover:text-brand-800 font-medium shadow-sm hover:shadow-md" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full">
      {/* Header / Progress */}
      <div className="w-full mb-12">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>问题 {currentIndex + 1} / {totalQuestions}</span>
          <span>完成度 {Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className={`w-full transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800 text-center mb-16 leading-tight">
          {question.text}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 w-full">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleOptionClick(opt.value)}
              className={`
                flex flex-col items-center justify-center py-6 px-2 rounded-xl border-2 transition-all duration-200
                ${opt.color} group
              `}
            >
              <span className="text-2xl mb-2 opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                {opt.value === 1 && "✕"}
                {opt.value === 2 && "−"}
                {opt.value === 3 && "="}
                {opt.value === 4 && "+"}
                {opt.value === 5 && "✓"}
              </span>
              <span className="text-xs md:text-sm text-center font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <p className="text-slate-400 text-sm">
             请相信您的第一直觉。答案没有对错之分。
           </p>
        </div>
      </div>
    </div>
  );
};