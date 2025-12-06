
import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AssessmentScreen } from './components/AssessmentScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { AppState, Answer, AnalysisResult } from './types';
import { QUESTIONS, TOTAL_STEPS } from './constants';
import { analyzeStrengths } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setAppState(AppState.ASSESSMENT);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setError(null);
  };

  const handleAnswer = async (value: number) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      value: value,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < TOTAL_STEPS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Assessment complete
      setAppState(AppState.ANALYZING);
      try {
        const analysisResult = await analyzeStrengths(updatedAnswers);
        setResult(analysisResult);
        setAppState(AppState.RESULTS);
      } catch (err) {
        console.error(err);
        setError("我们在分析您的档案时遇到了一些问题。请重试。");
        setAppState(AppState.ERROR);
      }
    }
  };

  const handleRestart = () => {
    setAppState(AppState.WELCOME);
    setResult(null);
    setAnswers([]);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-100 selection:text-brand-900">
      {appState === AppState.WELCOME && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {appState === AppState.ASSESSMENT && (
        <AssessmentScreen
          question={QUESTIONS[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={TOTAL_STEPS}
          onAnswer={handleAnswer}
        />
      )}

      {appState === AppState.ANALYZING && (
        <LoadingScreen />
      )}

      {appState === AppState.RESULTS && result && (
        <ResultsScreen result={result} onRestart={handleRestart} />
      )}

      {appState === AppState.ERROR && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <div className="bg-red-50 p-8 rounded-2xl max-w-md w-full border border-red-100">
            <h2 className="text-2xl font-bold text-red-800 mb-4">分析错误</h2>
            <p className="text-red-600 mb-6">{error || "发生了一些错误。"}</p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              重试
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;