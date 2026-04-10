import React, { useState, useEffect } from 'react';
import { Timer, Zap, Activity, XCircle, Award } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import { quizQuestions } from '../../data/mockGameData';

const SpeedChallenge = ({ onBack }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [questionsPool, setQuestionsPool] = useState([]);
  
  // New revealing states
  const [isRevealing, setIsRevealing] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    let timer;
    if (isPlaying && !isRevealing && timeLeft > 0 && !isFinished) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying && !isRevealing && !isFinished) {
      // Time expired on current question directly inline
      setIsRevealing(true);
      setSelectedAnswer(null); 
      setTimeout(() => {
        setWrongAttempts(prev => {
           const fails = prev + 1;
           if (fails >= 3) {
             setIsPlaying(false);
             setIsFinished(true); // Struck out
           } else {
             advanceQuestion();
           }
           return fails;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isRevealing, timeLeft, isFinished]);

  const startGame = () => {
    const jumbledData = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 20);
    const randomizedOptions = jumbledData.map(q => ({
       ...q,
       options: [...q.options].sort(() => Math.random() - 0.5)
    }));
    
    setQuestionsPool(randomizedOptions);
    setIsPlaying(true);
    setTimeLeft(5);
    setScore(0);
    setCurrentQIndex(0);
    setWrongAttempts(0);
    setIsFinished(false);
    setIsRevealing(false);
    setSelectedAnswer(null);
  };

  const handleFailure = () => {
    const fails = wrongAttempts + 1;
    setWrongAttempts(fails);
    if (fails >= 3) {
      setIsPlaying(false);
      setIsFinished(true); // Struck out
    } else {
      advanceQuestion();
    }
  };

  const advanceQuestion = () => {
    if (currentQIndex >= questionsPool.length - 1) {
       setIsPlaying(false);
       setIsFinished(true);
    } else {
       setIsRevealing(false);
       setSelectedAnswer(null);
       setCurrentQIndex(prev => prev + 1);
       setTimeLeft(5);
    }
  };

  const handleTimeout = () => {
    setIsRevealing(true);
    setSelectedAnswer(null); // Time out means nothing selected
    // Show correct answer for 1.5 seconds, then fail
    setTimeout(() => {
      handleFailure();
    }, 1500);
  };

  const handleQuickAnswer = (option) => {
    if (isRevealing) return;
    
    setIsRevealing(true);
    setSelectedAnswer(option);

    const activeQuestion = questionsPool[currentQIndex];
    if (option === activeQuestion.correct) {
      setScore(prev => prev + 15);
      // Flash green briefly and move on
      setTimeout(() => advanceQuestion(), 800);
    } else {
      // Reveal correct answer for longer so they can learn it
      setTimeout(() => handleFailure(), 1500);
    }
  };

  if (!isPlaying && !isFinished) {
    return (
      <div className="max-w-2xl mx-auto text-center py-10 animate-in fade-in duration-300">
        <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap size={48} className="animate-pulse" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">SPEED CHALLENGE</h2>
        <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto">20 Questions. You have exactly <span className="font-bold text-red-500">5 seconds</span> per question. 3 Strikes and you're out. Are you fast enough?</p>
        
        <div className="flex gap-4 justify-center">
          <Button onClick={startGame} className="bg-red-500 hover:bg-red-600 text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1">
            START FIRE
          </Button>
          <Button onClick={onBack} variant="outline" className="text-lg px-8 py-4 rounded-full">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const struckOut = wrongAttempts >= 3;
    return (
      <Card className={`max-w-md mx-auto mt-10 p-10 text-center border-t-8 ${struckOut ? 'border-red-600' : 'border-[#6DD3A0]'} animate-in zoom-in duration-300`}>
         {struckOut ? (
           <XCircle size={48} className="mx-auto text-red-600 mb-4" />
         ) : (
           <Award size={48} className="mx-auto text-[#6DD3A0] mb-4" />
         )}
         <h2 className="text-3xl font-bold text-slate-900 mb-2">
           {struckOut ? 'Strike Out!' : "Round Complete!"}
         </h2>
         <p className="text-slate-500">
           {struckOut ? 'You maxed out your wrong attempts.' : 'You survived all 20 questions!'}
         </p>
         
         <div className="my-8 py-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
           <Activity size={32} className={`mb-2 ${struckOut ? 'text-red-500' : 'text-[#6DD3A0]'}`} />
           <div className="text-6xl font-black text-slate-800">{score}</div>
           <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Total Points</div>
         </div>

         <div className="flex gap-4 w-full justify-center">
           <Button onClick={startGame} className={`${struckOut ? 'bg-red-500 hover:bg-red-600' : 'bg-[#5B8DEF] hover:bg-blue-600'} w-full`}>
             Play Again
           </Button>
           <Button onClick={onBack} variant="outline" className="w-full bg-slate-900 text-white hover:bg-slate-800">
             Hub
           </Button>
         </div>
      </Card>
    );
  }

  const activeQuestion = questionsPool[currentQIndex];

  return (
    <div className="max-w-3xl mx-auto py-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow border-2 border-red-100 mb-6 sticky top-20 z-10 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Timer className={`text-red-600 ${timeLeft <= 2 && !isRevealing ? 'animate-bounce' : ''}`} size={24} />
          </div>
          <div className={`text-3xl font-black tabular-nums ${timeLeft <= 2 ? 'text-red-600' : 'text-slate-800'}`}>
            00:0{timeLeft}
          </div>
        </div>
        
        {/* Progress & Strikes Indicator */}
        <div className="flex flex-col items-center border-l w-fit border-r border-red-100 px-6">
           <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-full border-2 ${i < wrongAttempts ? 'bg-red-600 border-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]' : 'border-slate-200'}`}></div>
              ))}
           </div>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
             Q: {currentQIndex + 1} / 20
           </span>
        </div>

        <div className="text-right">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Score</div>
          <div className="text-2xl font-black text-slate-800">{score}</div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className={`bg-white p-4 rounded-3xl shadow-lg border-4 ${isRevealing && selectedAnswer !== activeQuestion.correct ? 'border-red-500' : isRevealing && selectedAnswer === activeQuestion.correct ? 'border-green-500' : 'border-slate-100'} mb-8 max-w-sm w-full mx-auto relative overflow-hidden group min-h-[16rem] flex items-center justify-center transition-colors duration-300`}>
          <div className={`absolute inset-0 z-0 ${isRevealing && selectedAnswer !== activeQuestion.correct ? 'bg-red-50' : isRevealing && selectedAnswer === activeQuestion.correct ? 'bg-green-50' : 'bg-gradient-to-br from-red-500/5 to-orange-500/5'}`}></div>
          <div className="relative z-10 flex flex-col items-center w-full h-48 justify-center overflow-hidden">
             {activeQuestion && activeQuestion.options ? (
               activeQuestion.imageSrc ? (
                 <img src={activeQuestion.imageSrc} alt="Sign" className="w-full h-full object-contain mix-blend-multiply drop-shadow-md rounded-lg" />
               ) : (
                 <div className="text-8xl font-bold text-slate-800">{activeQuestion.word || 'X'}</div>
               )
             ) : null}
          </div>
          
          {/* Timeout Visual Alert Bar */}
          {!isRevealing && (
             <div className="absolute bottom-0 left-0 h-2 bg-red-500 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 5) * 100}%` }}></div>
          )}
        </div>

        {isRevealing && selectedAnswer !== activeQuestion.correct && (
            <div className="mb-4 text-red-600 font-bold animate-pulse text-lg">
               {selectedAnswer === null ? "Time's up!" : "Incorrect!"} Here is the answer:
            </div>
        )}

        <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto">
          {activeQuestion && activeQuestion.options.map((opt, idx) => {
             let btnClass = "bg-white border-2 border-slate-200 hover:border-red-500 hover:bg-red-50 text-slate-800 font-bold py-6 px-4 rounded-2xl shadow-sm text-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center text-center";
             
             if (isRevealing) {
                 btnClass = "py-6 px-4 rounded-2xl shadow-sm text-xl font-bold border-2 transition-all flex items-center justify-center text-center ";
                 if (opt === activeQuestion.correct) {
                     // Always highlight correct in Green
                     btnClass += "bg-green-100 border-green-500 text-green-800 scale-105 shadow-md ring-2 ring-green-300";
                 } else if (opt === selectedAnswer) {
                     // Highlight wrong selected in Red
                     btnClass += "bg-red-100 border-red-500 text-red-800";
                 } else {
                     // Fade out others
                     btnClass += "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                 }
             }

             return (
               <button 
                 key={idx} 
                 disabled={isRevealing}
                 onClick={() => handleQuickAnswer(opt)}
                 className={btnClass}
               >
                 {opt}
               </button>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpeedChallenge;
