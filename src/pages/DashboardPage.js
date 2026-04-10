import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Languages, BrainCircuit, Heart, MoveRight, Award, Flame, Zap, CheckCircle, TrendingUp, Clock, Target, Calendar } from 'lucide-react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';

const DashboardPage = () => {
  // Persistent stats using localStorage
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('ishario_stats');
    if (saved) return JSON.parse(saved);
    return {
      totalXP: 0,
      sessions: 0,
      streak: 0,
      lastPlayDate: null,
      gamesPlayed: { guess: 0, speed: 0, camera: 0 },
      highScores: { guess: 0, speed: 0, camera: 0 },
      alphabetProgress: 0,
      wordsProgress: 0,
      phrasesProgress: 0,
      avgQuizScore: 0,
      badges: [],
      signsLearned: 0,
      totalCorrect: 0,
      totalAttempts: 0,
    };
  });

  // Increment session on mount (once per visit)
  useEffect(() => {
    setStats(prev => {
      const today = new Date().toDateString();
      const isNewDay = prev.lastPlayDate !== today;
      const updated = {
        ...prev,
        sessions: prev.sessions + 1,
        streak: isNewDay ? prev.streak + 1 : prev.streak,
        lastPlayDate: today,
      };
      localStorage.setItem('ishario_stats', JSON.stringify(updated));
      return updated;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate derived values
  const level = Math.floor(stats.totalXP / 500) + 1;
  const xpForNextLevel = level * 500;
  const xpInCurrentLevel = stats.totalXP % 500;
  const levelProgress = Math.round((xpInCurrentLevel / 500) * 100);
  const accuracy = stats.totalAttempts > 0 ? Math.round((stats.totalCorrect / stats.totalAttempts) * 100) : 0;

  // Badge definitions
  const allBadges = [
    { id: 'first_game', emoji: '🎮', name: 'First Steps', desc: 'Play your first game', unlocked: stats.sessions >= 1 },
    { id: 'alphabet_master', emoji: '🥇', name: 'Alphabet Master', desc: 'Learn all 26 letters', unlocked: stats.alphabetProgress >= 100 },
    { id: 'streak_3', emoji: '🔥', name: 'On Fire', desc: '3 day play streak', unlocked: stats.streak >= 3 },
    { id: 'streak_7', emoji: '⚡', name: 'Unstoppable', desc: '7 day play streak', unlocked: stats.streak >= 7 },
    { id: 'speed_demon', emoji: '💨', name: 'Speed Demon', desc: 'Score 100+ in Speed', unlocked: stats.highScores.speed >= 100 },
    { id: 'xp_500', emoji: '⭐', name: 'Rising Star', desc: 'Earn 500 XP', unlocked: stats.totalXP >= 500 },
    { id: 'xp_1000', emoji: '🌟', name: 'Superstar', desc: 'Earn 1000 XP', unlocked: stats.totalXP >= 1000 },
    { id: 'sessions_10', emoji: '📚', name: 'Dedicated', desc: '10 learning sessions', unlocked: stats.sessions >= 10 },
    { id: 'accuracy_90', emoji: '🎯', name: 'Sharpshooter', desc: '90%+ accuracy', unlocked: accuracy >= 90 },
    { id: 'signs_50', emoji: '🤟', name: 'Sign Expert', desc: 'Learn 50 signs', unlocked: stats.signsLearned >= 50 },
    { id: 'phrase_genius', emoji: '🕵️', name: 'Phrase Genius', desc: 'Complete Hard level', unlocked: stats.phrasesProgress >= 100 },
    { id: 'word_wizard', emoji: '📝', name: 'Word Wizard', desc: 'Complete Words path', unlocked: stats.wordsProgress >= 100 },
  ];

  const unlockedCount = allBadges.filter(b => b.unlocked).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back, Learner! 👋</h1>
        <p className="text-slate-500 mt-2">Here's your real-time progress and quick access to tools.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-white border-blue-100">
              <TrendingUp size={22} className="mx-auto text-[#5B8DEF] mb-2" />
              <p className="text-3xl font-black text-slate-800">{stats.totalXP.toLocaleString()}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total XP</p>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-white border-green-100">
              <Target size={22} className="mx-auto text-[#6DD3A0] mb-2" />
              <p className="text-3xl font-black text-slate-800">{accuracy}%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Accuracy</p>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-orange-50 to-white border-orange-100">
              <Flame size={22} className="mx-auto text-orange-500 mb-2" />
              <p className="text-3xl font-black text-slate-800">{stats.streak}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Day Streak</p>
            </Card>
            <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-white border-purple-100">
              <Clock size={22} className="mx-auto text-purple-500 mb-2" />
              <p className="text-3xl font-black text-slate-800">{stats.sessions}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Sessions</p>
            </Card>
          </div>

          {/* Quick Access */}
          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-4">Quick Access</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/lessons">
              <Card className="hover:border-[#FF8A65] group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-orange-50 text-[#FF8A65] rounded-xl">
                    <BookOpen size={24} />
                  </div>
                  <MoveRight size={20} className="text-slate-300 group-hover:text-[#FF8A65] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Lessons</h3>
                <p className="text-slate-500 text-sm flex-grow">Learn alphabets and common phrases interactively.</p>
              </Card>
            </Link>

            <Link to="/translator">
              <Card className="hover:border-[#5B8DEF] group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 text-[#5B8DEF] rounded-xl">
                    <Languages size={24} />
                  </div>
                  <MoveRight size={20} className="text-slate-300 group-hover:text-[#5B8DEF] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Translator</h3>
                <p className="text-slate-500 text-sm flex-grow">Two-way real-time translation with camera & voice.</p>
              </Card>
            </Link>

            <Link to="/quiz">
              <Card className="hover:border-purple-500 group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-50 text-purple-500 rounded-xl">
                    <BrainCircuit size={24} />
                  </div>
                  <MoveRight size={20} className="text-slate-300 group-hover:text-purple-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Game Center</h3>
                <p className="text-slate-500 text-sm flex-grow">Level up with speed challenges and quizzes!</p>
              </Card>
            </Link>

            <Link to="/lessons">
              <Card className="hover:border-pink-500 group flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-pink-50 text-pink-500 rounded-xl">
                    <Heart size={24} />
                  </div>
                  <MoveRight size={20} className="text-slate-300 group-hover:text-pink-500 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Favorites</h3>
                <p className="text-slate-500 text-sm flex-grow">Access your saved signs and phrases quickly.</p>
              </Card>
            </Link>
          </div>

          {/* Achievements Section */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4 border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold text-slate-800">Your Achievements</h2>
              <span className="text-sm font-bold text-[#5B8DEF] bg-blue-50 px-3 py-1 rounded-lg">{unlockedCount} / {allBadges.length} Unlocked</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {allBadges.map((badge) => (
                 <Card 
                   key={badge.id} 
                   className={`p-4 text-center relative overflow-hidden group transition-all ${
                     badge.unlocked 
                       ? 'border-2 border-yellow-200 bg-gradient-to-b from-white to-yellow-50' 
                       : 'border-2 border-slate-100 bg-slate-50 opacity-50 grayscale'
                   }`}
                 >
                   {badge.unlocked && <div className="absolute top-2 right-2 text-green-500"><CheckCircle size={16}/></div>}
                   <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{badge.emoji}</div>
                   <h4 className="font-bold text-slate-800 text-sm leading-tight">{badge.name}</h4>
                   <p className="text-xs text-slate-500 mt-1">{badge.desc}</p>
                 </Card>
               ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Progress Tracker */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Player Stats</h2>
          <Card className="bg-gradient-to-br from-white to-blue-50/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow border-4 border-[#5B8DEF]">
                <Award size={32} className="text-[#5B8DEF]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-xl tracking-tight">Level {level}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                  <Flame size={16} className="text-orange-500" /> {stats.streak} Day Play Streak
                </p>
              </div>
            </div>

            {/* Level Progress */}
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Level Progress</span>
                <span className="text-xs font-bold text-[#5B8DEF]">{xpInCurrentLevel} / {500} XP</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#5B8DEF] to-[#6DD3A0] rounded-full transition-all duration-500" style={{ width: `${levelProgress}%` }}></div>
              </div>
            </div>

            <div className="space-y-5">
              <ProgressBar progress={stats.alphabetProgress} label="Alphabet Mastery" color="bg-[#6DD3A0]" />
              <ProgressBar progress={stats.wordsProgress} label="Words Path" color="bg-[#5B8DEF]" />
              <ProgressBar progress={stats.phrasesProgress} label="Sentences Path" color="bg-purple-500" />
              <ProgressBar progress={accuracy} label="Overall Accuracy" color="bg-[#FF8A65]" />
            </div>

            {/* Game Breakdown */}
            <div className="mt-8 pt-6 border-t border-slate-100">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Games Played</h4>
               <div className="grid grid-cols-3 gap-3 text-center">
                 <div className="bg-white py-3 rounded-xl shadow-sm border border-slate-100">
                   <p className="text-2xl font-black text-slate-800">{stats.gamesPlayed.guess}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Guess</p>
                 </div>
                 <div className="bg-white py-3 rounded-xl shadow-sm border border-slate-100">
                   <p className="text-2xl font-black text-red-500">{stats.gamesPlayed.speed}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Speed</p>
                 </div>
                 <div className="bg-white py-3 rounded-xl shadow-sm border border-slate-100">
                   <p className="text-2xl font-black text-[#6DD3A0]">{stats.gamesPlayed.camera}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Camera</p>
                 </div>
               </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 pt-6 border-t border-slate-100">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Activity</h4>
               <div className="flex items-center gap-3 text-sm text-slate-600">
                 <Calendar size={16} className="text-slate-400" />
                 <span>Last played: <span className="font-bold text-slate-800">{stats.lastPlayDate || 'Today'}</span></span>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
