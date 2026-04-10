import React, { useState } from 'react';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const FavoritesPage = () => {
  // Mock favorites list
  const [favorites, setFavorites] = useState([
    { id: 1, type: 'letter', text: 'H', image: 'https://placehold.co/120x160/F7F9FC/EC4899?text=H' },
    { id: 2, type: 'letter', text: 'E', image: 'https://placehold.co/120x160/F7F9FC/EC4899?text=E' },
    { id: 3, type: 'phrase', text: 'Thank You', image: '🙏' },
    { id: 4, type: 'phrase', text: 'Hello', image: '👋' }
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-pink-500 fill-pink-500 w-8 h-8" />
        <h1 className="text-3xl font-bold text-slate-900">Your Saved Signs</h1>
      </div>

      {favorites.length === 0 ? (
        <Card className="text-center py-20 max-w-2xl mx-auto">
           <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
             <Heart size={32} />
           </div>
           <h2 className="text-2xl font-bold text-slate-800 mb-2">No favorites yet</h2>
           <p className="text-slate-500 mb-8">Go to the Lessons page to start saving your favorite signs and phrases for quick access.</p>
           <Link to="/lessons">
             <Button className="bg-pink-500 hover:bg-pink-600">
               Explore Lessons <ArrowRight className="ml-2 w-4 h-4" />
             </Button>
           </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((fav) => (
            <Card key={fav.id} className="relative group overflow-hidden border-2 border-transparent hover:border-pink-200">
              <button 
                onClick={() => removeFavorite(fav.id)}
                className="absolute top-2 right-2 bg-white/80 p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 z-10 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="flex flex-col h-full items-center">
                {fav.type === 'letter' ? (
                  <div className="w-full bg-slate-50 rounded-lg mb-4 flex-1 flex items-center justify-center overflow-hidden">
                    <img src={fav.image} alt={fav.text} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full bg-pink-50 rounded-lg mb-4 flex-1 flex items-center justify-center min-h-[140px]">
                    <span className="text-6xl">{fav.image}</span>
                  </div>
                )}
                <h3 className="font-bold text-slate-800 text-lg">{fav.text}</h3>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400 mt-1">{fav.type}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
