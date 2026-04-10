import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start items-center gap-2 mb-4 md:mb-0">
             <div className="w-6 h-6 bg-[#5B8DEF] text-white rounded flex items-center justify-center font-bold text-xs">I</div>
             <span className="font-bold text-slate-800">Ishario</span>
          </div>
          <p className="mt-4 text-center text-sm text-slate-500 md:mt-0 md:order-1 flex items-center justify-center gap-1">
            &copy; 2026 Ishario Platform. Built with <Heart size={14} className="text-red-500" /> for accessibility.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
