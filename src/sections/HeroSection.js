import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Bridging Communication Through <span className="text-[#5B8DEF]">Sign Language</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Ishario makes learning and translating sign language effortless. Whether you're communicating with a loved one or mastering a new skill, start your journey today.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard">
              <Button className="py-4 px-8 text-lg rounded-full">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/translator">
              <Button variant="outline" className="py-4 px-8 text-lg rounded-full">
                Try Translator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
