import React, { useState } from 'react';
import { BrainCircuit, Zap, Camera, ArrowRight, Lock, MapPin } from 'lucide-react';
import Card from '../components/Card';

// Import Game Components
import GuessTheSign from '../components/games/GuessTheSign';
import SpeedChallenge from '../components/games/SpeedChallenge';
import CameraGame from '../components/games/CameraGame';

const QuizPage = () => {
  const [activeGame, setActiveGame] = useState(null);

  const handleBack = () => {
    setActiveGame(null);
  };

  if (activeGame === 'guess') return <GuessTheSign onBack={handleBack} />;
  if (activeGame === 'speed') return <SpeedChallenge onBack={handleBack} />;
  if (activeGame === 'camera') return <CameraGame onBack={handleBack} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
         <div>
           <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
             <BrainCircuit className="text-purple-500" size={32} />
             Game Center
           </h1>
           <p className="text-slate-500 mt-2">Test your skills, earn XP, and unlock achievements.</p>
         </div>
         <div className="bg-purple-50 px-4 py-2 rounded-xl flex items-center gap-3 border border-purple-100 shadow-sm">
            <span className="font-bold text-slate-700">Total XP</span>
            <span className="bg-purple-500 text-white px-3 py-1 rounded-lg font-black tracking-widest">1,250</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Game Modes Hub (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">Mini Games</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card onClick={() => setActiveGame('guess')} className="cursor-pointer hover:border-[#5B8DEF] group h-full flex flex-col justify-between hover:shadow-lg transition-all">
               <div>
                 <div className="w-14 h-14 bg-blue-50 text-[#5B8DEF] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                   <BrainCircuit size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Guess the Sign</h3>
                 <p className="text-slate-500 text-sm mb-6">Choose your difficulty: Letters to full Sentences. Guess the translation with 3 strikes!</p>
               </div>
               <div className="font-bold text-[#5B8DEF] text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Play Now <ArrowRight size={16}/></div>
            </Card>

            <Card onClick={() => setActiveGame('speed')} className="cursor-pointer hover:border-red-500 group h-full flex flex-col justify-between hover:shadow-lg transition-all">
               <div>
                 <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                   <Zap size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Speed Challenge</h3>
                 <p className="text-slate-500 text-sm mb-6">30 seconds on the clock. Survive the rapid fire mode and score as much as possible.</p>
               </div>
               <div className="font-bold text-red-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Play Now <ArrowRight size={16}/></div>
            </Card>
            
            <Card onClick={() => setActiveGame('camera')} className="cursor-pointer hover:border-[#6DD3A0] group h-full flex flex-col justify-between hover:shadow-lg transition-all">
               <div>
                 <div className="w-14 h-14 bg-green-50 text-[#6DD3A0] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                   <Camera size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Show the Sign</h3>
                 <p className="text-slate-500 text-sm mb-6">Interactive webcam game! Follow the prompts and sign natively in front of your camera.</p>
               </div>
               <div className="font-bold text-[#6DD3A0] text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Play Now <ArrowRight size={16}/></div>
            </Card>
          </div>
        </div>

        {/* Right Column - Gamified Learning Path */}
        <div>
           <div className="flex items-center gap-2 mb-4 tracking-tight">
             <MapPin className="text-slate-400" size={20} />
             <h2 className="text-xl font-bold text-slate-800">Structured Path</h2>
           </div>
          
          <div className="bg-white flex flex-col items-center rounded-2xl border border-slate-200 py-10 shadow-sm relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10"></div>
            
            {/* Level 1 Node Segment */}
            <div className="flex flex-col items-center w-full relative z-10">
               <button onClick={() => setActiveGame('guess')} className="w-16 h-16 bg-[#5B8DEF] rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white font-bold text-xl hover:scale-110 active:scale-95 transition-all z-20">
                 1
               </button>
               <div className="text-center mt-3 z-20 bg-white/80 px-2 py-1 rounded">
                 <h3 className="font-bold text-slate-800 text-lg">Alphabets</h3>
                 <p className="text-xs text-slate-500 font-medium">Unlocked</p>
               </div>
               {/* Vertical Connector Line */}
               <div className="w-2 h-10 bg-[#5B8DEF] -mt-1 -mb-1 block shadow-inner rounded-full"></div>
            </div>

            {/* Level 2 Node Segment */}
            <div className="flex flex-col items-center w-full relative z-10">
               <button className="w-16 h-16 bg-[#5B8DEF] rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white font-bold text-xl hover:scale-110 active:scale-95 transition-all relative z-20">
                 <div className="absolute inset-0 rounded-full border-4 border-[#6DD3A0] opacity-50 blur-sm animate-pulse"></div>
                 2
               </button>
               <div className="text-center mt-3 z-20 bg-white/80 px-2 py-1 rounded">
                 <h3 className="font-bold text-slate-800 text-lg">Words</h3>
                 <p className="text-xs text-[#5B8DEF] font-bold">In Progress (50%)</p>
               </div>
               {/* Vertical Connector Line Dashed */}
               <div className="w-2 h-10 border-l-4 border-dashed border-slate-300 -mt-1 -mb-1 ml-1 block"></div>
            </div>

            {/* Level 3 Node Segment (Locked) */}
            <div className="flex flex-col items-center w-full relative z-10">
               <button className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center shadow-inner border-4 border-white text-slate-400 cursor-not-allowed z-20">
                 <Lock size={20} />
               </button>
               <div className="text-center mt-3 z-20 bg-white/80 px-2 py-1 rounded">
                 <h3 className="font-bold text-slate-400 text-lg">Sentences</h3>
                 <p className="text-xs text-slate-400 font-medium tracking-tight">Requires Level 2</p>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizPage;
