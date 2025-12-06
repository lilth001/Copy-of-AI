
import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-brand-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-2">正在分析您的档案...</h2>
      <p className="text-slate-500 max-w-md text-center animate-pulse">
        识别主要认知模式，并映射到四大优势领域中。
      </p>
    </div>
  );
};