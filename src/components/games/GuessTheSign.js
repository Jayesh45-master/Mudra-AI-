import React, { useState } from 'react';
import { Award, ArrowRight, BrainCircuit, Lightbulb, Flame, AlertCircle, XCircle } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import { quizQuestions } from '../../data/mockGameData';

const GuessTheSign = ({ onBack }) => {
  const [difficulty, setDifficulty] = useState(null); 
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const activeQuestion = shuffledQuestions[currentQIndex];

  const handleStart = (selectedDiff) => {
    setDifficulty(selectedDiff);
    const pool = quizQuestions.filter(q => q.difficulty === selectedDiff);
    const jumbled = pool.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    })).sort(() => Math.random() - 0.5);
    setShuffledQuestions(jumbled);
  };

  const handleAnswer = (option) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setIsAnswered(true);
    
    if (option === activeQuestion.correct) {
      const points = 10 + (streak * 2); 
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
      const newFails = wrongAttempts + 1;
      setWrongAttempts(newFails);
      if (newFails >= 3) {
        setTimeout(() => setIsGameOver(true), 1500);
      }
    }
  };

  const handleNext = () => {
    if (currentQIndex < shuffledQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setDifficulty(null);
    setCurrentQIndex(0);
    setScore(0);
    setStreak(0);
    setWrongAttempts(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsFinished(false);
    setIsGameOver(false);
    setShowHint(false);
    setShuffledQuestions([]);
  };

  // 1. Difficulty Selector Screen
  if (!difficulty) {
    return (
      <div className="max-w-2xl mx-auto text-center py-10 animate-in fade-in zoom-in duration-300">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 flex justify-center items-center gap-2">
          <BrainCircuit className="text-[#5B8DEF]" size={36}/> Guess the Sign
        </h2>
        <p className="text-slate-500 mb-8">Select your difficulty level to start playing.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card onClick={() => handleStart('easy')} className="hover:border-[#6DD3A0] hover:bg-green-50 text-center cursor-pointer border-2 transition-all">
            <div className="text-4xl mb-3">🔤</div>
            <h3 className="font-bold text-lg text-slate-800">Easy</h3>
            <p className="text-sm text-slate-500">Letters, Numbers, Dates</p>
          </Card>
          <Card onClick={() => handleStart('medium')} className="hover:border-[#5B8DEF] hover:bg-blue-50 text-center cursor-pointer border-2 transition-all">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-bold text-lg text-slate-800">Medium</h3>
            <p className="text-sm text-slate-500">Words & Emergency</p>
          </Card>
          <Card onClick={() => handleStart('hard')} className="hover:border-[#FF8A65] hover:bg-orange-50 text-center cursor-pointer border-2 transition-all">
            <div className="text-4xl mb-3">🗣️</div>
            <h3 className="font-bold text-lg text-slate-800">Hard</h3>
            <p className="text-sm text-slate-500">Full Sentences</p>
          </Card>
        </div>
        <button onClick={onBack} className="mt-8 text-slate-400 hover:text-slate-600 font-medium">← Back to Games Hub</button>
      </div>
    );
  }

  // 2. Game Over / Finished Screen
  if (isFinished || isGameOver) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className={`p-10 flex flex-col items-center border-t-8 ${isGameOver ? 'border-red-500' : 'border-yellow-400'}`}>
          <div className="relative">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner ${isGameOver ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
              {isGameOver ? <XCircle size={48} /> : <Award size={48} />}
            </div>
            {score > 50 && !isGameOver && <span className="absolute -top-2 -right-2 text-3xl animate-bounce">🔥</span>}
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            {isGameOver ? 'Game Over!' : 'Level Complete!'}
          </h2>
          <p className="text-slate-500 mb-8 text-lg">
            {isGameOver ? 'You reached 3 strikes.' : `You scored `}
             {!isGameOver && <span className="font-bold text-[#5B8DEF]">{score}</span>}
             {!isGameOver && ' points.'}
          </p>
          
          <div className="flex gap-4 w-full justify-center">
            <Button onClick={resetQuiz} variant={isGameOver ? "outline" : "secondary"} className="w-auto px-8">
              Play Again
            </Button>
            <Button onClick={onBack} variant="outline" className="w-auto px-8 bg-slate-900 text-white hover:bg-slate-800">
              Return to Hub
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // 3. Active Gameplay Screen
  return (
    <div className="max-w-3xl mx-auto py-6 animate-in fade-in duration-300">
      {/* Top HUD */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
         <div className="flex items-center gap-4">
           <button onClick={onBack} className="text-slate-400 hover:text-slate-600 text-sm font-medium pr-4 border-r border-slate-200">← Exit</button>
           <div>
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{difficulty} LEVEL</div>
             <div className="text-sm font-medium text-slate-700">Question {currentQIndex + 1} of {shuffledQuestions.length}</div>
           </div>
         </div>
         <div className="flex items-center gap-4">
           {/* Strikes Indicator */}
           <div className="flex gap-1 border-r border-slate-200 pr-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i < wrongAttempts ? 'bg-red-500' : 'bg-slate-200'}`}></div>
              ))}
           </div>
           <div className={`flex items-center gap-1 font-bold ${streak >= 3 ? 'text-orange-500 animate-pulse' : 'text-slate-400'}`}>
             <Flame size={20} className={streak >= 3 ? 'fill-orange-500' : ''}/>
             {streak}
           </div>
           <div className="bg-slate-100 px-4 py-2 rounded-xl font-bold text-slate-800 flex items-center gap-2 shadow-inner">
             {score} <span className="text-xs text-slate-400">PTS</span>
           </div>
         </div>
      </div>

      <Card className="overflow-hidden border-2 border-slate-100 p-0 relative shadow-md">
        <div className="w-full bg-slate-100 h-2 absolute top-0 left-0">
           <div className="bg-[#5B8DEF] h-2 transition-all duration-300" style={{ width: `${((currentQIndex) / shuffledQuestions.length) * 100}%` }}></div>
        </div>

        <div className="bg-slate-50 p-6 flex justify-center items-center rounded-t-xl border-b border-slate-100 mt-2">
           <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center h-64 w-full max-w-sm justify-center overflow-hidden">
             {activeQuestion && activeQuestion.imageSrc && (
               <img src={activeQuestion.imageSrc} alt="Sign" className="w-full h-full object-contain mix-blend-multiply" />
             )}
           </div>
        </div>
        
        <div className="p-8 pb-10 text-center relative">
           <h2 className="text-xl font-medium text-slate-800 mb-8">What does this sign mean?</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
             {activeQuestion && activeQuestion.options.map((option, idx) => {
               let buttonClass = "w-full py-4 px-6 rounded-xl font-bold text-lg transition-all border-2 flex items-center justify-center ";
               
               if (!isAnswered) {
                 buttonClass += "bg-white border-slate-200 hover:border-[#5B8DEF] hover:bg-blue-50 text-slate-700 hover:-translate-y-1";
               } else {
                 if (option === activeQuestion.correct) {
                   buttonClass += "bg-green-100 border-green-500 text-green-800 shadow-inner";
                 } else if (option === selectedAnswer) {
                   buttonClass += "bg-red-100 border-red-500 text-red-800 shadow-inner";
                 } else {
                   buttonClass += "bg-white border-slate-200 text-slate-300 opacity-50";
                 }
               }

               return (
                 <button key={idx} onClick={() => handleAnswer(option)} disabled={isAnswered} className={buttonClass}>
                   {option}
                 </button>
               );
             })}
           </div>

           {!isAnswered && !showHint && activeQuestion?.hint && (
             <button onClick={() => setShowHint(true)} className="mt-6 flex items-center justify-center gap-2 mx-auto text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-full">
               <Lightbulb size={16} /> Need a hint?
             </button>
           )}

           {showHint && !isAnswered && (
             <div className="mt-6 max-w-md mx-auto bg-orange-50 border border-orange-200 p-4 rounded-xl flex gap-3 text-left animate-in slide-in-from-bottom-2 duration-300">
               <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={20} />
               <p className="text-sm text-orange-800 font-medium">{activeQuestion.hint}</p>
             </div>
           )}

           {isAnswered && wrongAttempts < 3 && (
             <div className="mt-8 animate-in slide-in-from-bottom-4 flex justify-center max-w-lg mx-auto border-t border-slate-100 pt-6">
               <Button onClick={handleNext} className="w-full md:w-auto bg-[#5B8DEF]">
                 {currentQIndex === shuffledQuestions.length - 1 ? 'Finish Level' : 'Next Question'} <ArrowRight className="ml-2" size={18} />
               </Button>
             </div>
           )}
        </div>
      </Card>
    </div>
  );
};

export default GuessTheSign;
