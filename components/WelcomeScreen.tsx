
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const FeatureCard = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-left">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center max-w-4xl mx-auto">
      <div className="mb-8 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-600 rounded-full blur opacity-25 animate-pulse"></div>
        <div className="relative bg-white rounded-full p-6 shadow-xl">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-slate-850 tracking-tight mb-4">
        发现您的<span className="text-brand-600">真实优势</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
        释放您的潜能。基于积极心理学和盖洛普方法论，StrengthScope AI 将通过先进的算法分析您的认知模式，揭示您的前5大标志性才干主题。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
        <FeatureCard 
          icon="⚡" 
          title="快速精准" 
          desc="24道核心问题，由 Gemini Pro 深度分析。" 
        />
        <FeatureCard 
          icon="🧠" 
          title="深度洞察" 
          desc="超越简单的评分，理解您性格中的细微差别。" 
        />
        <FeatureCard 
          icon="🚀" 
          title="行动指南" 
          desc="获取切实可行的建议，发挥您的天赋。" 
        />
      </div>

      <button 
        onClick={onStart}
        className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-brand-600 px-8 font-medium text-white transition-all duration-300 hover:bg-brand-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
      >
        <span className="mr-2 text-lg">开始专业测评</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
      
      <p className="mt-6 text-sm text-slate-400">
        预计耗时3分钟 • 无需注册
      </p>
    </div>
  );
};