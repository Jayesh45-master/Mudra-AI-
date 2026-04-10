import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Card from '../components/Card';
import { 
  alphabetData, numbersData, daysData, monthsData, 
  greetingsData, commonPhrasesData, healthcareData, 
  educationData, emergencyData 
} from '../data/signMappings';

const LessonsPage = () => {
  const [activeTab, setActiveTab] = useState('alphabet');
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(i => i.text === item.text);
      if (exists) {
        return prev.filter(i => i.text !== item.text);
      }
      return [...prev, item];
    });
  };

  const isFavorite = (text) => {
    return favorites.some(f => f.text === text);
  };

  const categories = [
    { id: 'favorites', label: 'Favorites', data: favorites, type: 'mixed' },
    { id: 'alphabet', label: 'Alphabet', data: alphabetData, type: 'letter' },
    { id: 'numbers', label: 'Numbers', data: numbersData, type: 'letter' },
    { id: 'days', label: 'Days', data: daysData, type: 'word' },
    { id: 'months', label: 'Months', data: monthsData, type: 'word' },
    { id: 'greetings', label: 'Greetings', data: greetingsData, type: 'phrase' },
    { id: 'commonPhrases', label: 'Common Phrases', data: commonPhrasesData, type: 'phrase' },
    { id: 'healthcare', label: 'Healthcare', data: healthcareData, type: 'phrase' },
    { id: 'education', label: 'Education', data: educationData, type: 'phrase' },
    { id: 'emergency', label: 'Emergency', data: emergencyData, type: 'phrase' }
  ];

  const activeCategory = categories.find(c => c.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      <div className="mb-8">
         <h1 className="text-3xl font-bold text-slate-900">Learning Center</h1>
         <p className="text-slate-500 mt-2">Master sign language step by step or review your favorites.</p>
      </div>

      {/* Scrollable Tabs Wrapper */}
      <div className="flex overflow-x-auto pb-4 mb-4 gap-3 scrollbar-hide">
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
              activeTab === cat.id 
                ? (cat.id === 'favorites' ? 'bg-red-500 text-white shadow-md' : 'bg-[#5B8DEF] text-white shadow-md') 
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {cat.id === 'favorites' && <Heart size={16} fill={activeTab === 'favorites' ? "currentColor" : "none"} className={activeTab !== 'favorites' ? 'text-red-500' : ''} />}
            {cat.label}
            {cat.id === 'favorites' && <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full ml-1">{favorites.length}</span>}
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          {activeCategory.label}
        </h2>
        
        {/* Render grid dynamically based on type */}
        {activeCategory.id === 'favorites' && activeCategory.data.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 animate-in zoom-in duration-300">
             <Heart className="mx-auto text-slate-300 mb-4" size={48} />
             <h3 className="text-xl font-bold text-slate-500 mb-2">No Favorites Yet</h3>
             <p className="text-slate-400 max-w-md mx-auto">Click the heart icon on any sign in the other tabs to save it here for quick practice and reference.</p>
          </div>
        ) : activeCategory.type === 'letter' ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
            {activeCategory.data.map((item) => (
              <Card key={item.text} className="flex flex-col items-center justify-center p-3 hover:border-[#5B8DEF] cursor-pointer group bg-slate-50/50">
                <div className="w-full aspect-square bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden relative shadow-sm border border-slate-100">
                   <img src={item.image} alt={`Sign for ${item.text}`} title={item.text} className="object-contain w-full h-full p-3 group-hover:scale-110 transition-transform mix-blend-multiply" />
                   <button 
                     onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
                     className={`absolute top-2 right-2 transition-all p-1.5 rounded-md backdrop-blur-sm z-10 ${
                       isFavorite(item.text) ? 'text-red-500 bg-red-50/80 hover:bg-red-100 scale-110' : 'text-slate-400 bg-white/50 hover:text-red-400 hover:bg-white/80'
                     }`}
                   >
                     <Heart size={16} fill={isFavorite(item.text) ? "currentColor" : "none"} />
                   </button>
                </div>
                <div className="flex items-center justify-center w-full px-2">
                  <span className="text-xl font-bold text-slate-800">{item.text}</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activeCategory.data.map((item, idx) => (
              <Card key={idx} className="flex flex-col hover:border-[#FF8A65] group cursor-pointer relative p-4 bg-slate-50/50">
                <div className="h-48 bg-white rounded-xl mb-4 flex items-center justify-center relative overflow-hidden shadow-sm border border-slate-100">
                   <img src={item.image} alt={`Sign for ${item.text}`} title={item.text} className="object-contain w-full h-full p-4 group-hover:scale-110 transition-transform mix-blend-multiply" />
                   <button 
                     onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
                     className={`absolute top-3 right-3 transition-all p-2 rounded-lg backdrop-blur-sm z-10 ${
                       isFavorite(item.text) ? 'text-red-500 bg-red-50/80 hover:bg-red-100 scale-110' : 'text-slate-400 bg-slate-100/50 hover:text-red-400 hover:bg-slate-100/80'
                     }`}>
                     <Heart size={20} fill={isFavorite(item.text) ? "currentColor" : "none"} />
                   </button>
                </div>
                <div className="flex justify-between items-center text-center w-full">
                  <h3 className="text-lg font-bold text-slate-800 w-full">{item.text}</h3>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsPage;
