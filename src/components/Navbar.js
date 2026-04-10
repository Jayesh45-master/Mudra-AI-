import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Translate', path: '/translator' },
    { name: 'Learn', path: '/lessons' },
    { name: 'Quiz', path: '/quiz' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#5B8DEF] text-white rounded flex items-center justify-center font-bold text-xl">I</div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">Ishario</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors font-medium text-sm ${isActive(link.path) ? 'text-[#5B8DEF]' : 'text-slate-600 hover:text-[#5B8DEF]'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/dashboard" className="bg-[#5B8DEF] hover:bg-[#4a7bdd] transition-colors text-white px-5 py-2 rounded-lg font-medium text-sm shadow-sm hover:shadow">
              Get Started
            </Link>
          </div>

          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive(link.path) ? 'bg-blue-50 border-[#5B8DEF] text-[#5B8DEF]' : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
