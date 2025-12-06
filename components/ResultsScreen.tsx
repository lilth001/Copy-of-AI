import React from 'react';
import { AnalysisResult, StrengthTheme } from '../types';
import { DOMAIN_COLORS as DC, DOMAIN_BG as DB, DOMAIN_LABELS } from '../constants';

interface ResultsScreenProps {
  result: AnalysisResult;
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onRestart }) => {

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const lines = [
      "盖洛普优势分析 AI - 个人报告",
      "====================================",
      `生成时间: ${new Date().toLocaleDateString()}`,
      "",
      "【执行摘要】",
      result.executiveSummary,
      "",
      "【详细档案摘要】",
      result.summary,
      "",
      "====================================",
      "您的五大标志性优势主题",
      "====================================",
      ""
    ];

    result.topThemes.forEach((theme, index) => {
      lines.push(`#${index + 1} ${theme.name} (${DOMAIN_LABELS[theme.domain]})`);
      lines.push(`描述: ${theme.description}`);
      lines.push(`个性化洞察: ${theme.personalizedInsight}`);
      lines.push("行动建议:");
      theme.actionableAdvice.forEach(advice => lines.push(` - ${advice}`));
      lines.push("");
      lines.push("------------------------------------");
      lines.push("");
    });

    const element = document.createElement("a");
    const file = new Blob([lines.join("\n")], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "优势分析报告.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 print-bg-white">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white pt-20 pb-32 px-6 print:bg-white print:text-black print:pt-0 print:pb-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-brand-600 rounded-full text-xs font-bold tracking-widest uppercase mb-4 no-print">
            分析完成
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 print:text-3xl">您的标志性优势档案</h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed print:text-slate-700 print:text-sm">
            {result.executiveSummary}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-20 print:mt-0">
        
        {/* Actions Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 no-print">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-slate-100 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            保存为 PDF
          </button>
          <button 
            onClick={handleDownloadTxt}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-slate-100 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            下载文本报告
          </button>
        </div>
        
        {/* Top 5 Cards */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          {result.topThemes.map((theme, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row transform transition hover:scale-[1.01] duration-300 print:shadow-none print:border print:mb-4 print-break-inside-avoid">
              {/* Color Strip / Rank */}
              <div 
                className="w-full md:w-24 flex items-center justify-center p-4 md:p-0 print:w-16"
                style={{ backgroundColor: DB[theme.domain] }}
              >
                <span className="text-4xl font-bold text-white opacity-90 print:text-2xl">#{index + 1}</span>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8 flex-1 print:p-4">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-slate-900">{theme.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${DC[theme.domain]} print:border-slate-300 print:text-slate-600 print:bg-transparent`}>
                    {DOMAIN_LABELS[theme.domain]}
                  </span>
                </div>
                
                <p className="text-slate-600 mb-6 leading-relaxed print:text-sm print:mb-3">
                  {theme.description}
                </p>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-6 print:bg-white print:border-slate-200 print:p-3 print:mb-3">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center">
                    <span className="mr-2 no-print">💡</span> 个性化洞察
                  </h4>
                  <p className="text-slate-700 italic print:text-sm">"{theme.personalizedInsight}"</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
                    行动建议
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 print:block">
                    {theme.actionableAdvice.map((advice, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600 print:mb-1">
                        <span className="mr-2 text-brand-500 print:text-slate-400">•</span>
                        {advice}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12 print:shadow-none print:p-0 print-break-inside-avoid">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 print:text-xl print:mb-3">详细档案摘要</h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed print:text-sm">
            <p>{result.summary}</p>
          </div>
        </div>

        <div className="text-center no-print">
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
          >
            开始新的测试
          </button>
        </div>
        
        <div className="mt-12 text-center text-slate-400 text-sm print:mt-6">
          <p>© 2024 StrengthScope AI. Powered by Google Gemini.</p>
        </div>

      </div>
    </div>
  );
};