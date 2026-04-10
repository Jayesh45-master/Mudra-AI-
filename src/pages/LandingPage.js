import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Languages, BookOpen, BrainCircuit, HandMetal } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to learn, practice, and translate sign language in real-time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="flex flex-col items-center text-center hover:border-[#5B8DEF]">
              <div className="w-14 h-14 bg-blue-50 text-[#5B8DEF] rounded-2xl flex items-center justify-center mb-6">
                <Languages size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Text to Sign</h3>
              <p className="text-slate-600">Type what you want to say and see it translated instantly into sign language.</p>
            </Card>

            <Card className="flex flex-col items-center text-center hover:border-[#6DD3A0]">
              <div className="w-14 h-14 bg-green-50 text-[#6DD3A0] rounded-2xl flex items-center justify-center mb-6">
                <HandMetal size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sign to Text</h3>
              <p className="text-slate-600">Use your camera to translate sign language gestures into readable text natively.</p>
            </Card>

            <Card className="flex flex-col items-center text-center hover:border-[#FF8A65]">
              <div className="w-14 h-14 bg-orange-50 text-[#FF8A65] rounded-2xl flex items-center justify-center mb-6">
                <BookOpen size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Learning Modules</h3>
              <p className="text-slate-600">Step-by-step interactive lessons to build your sign language vocabulary.</p>
            </Card>

            <Card className="flex flex-col items-center text-center hover:border-purple-500">
              <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <BrainCircuit size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Interactive Quiz</h3>
              <p className="text-slate-600">Test your knowledge with visual quizzes and track your progress over time.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Start learning in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-200 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white border-4 border-[#5B8DEF] rounded-full flex items-center justify-center text-2xl font-bold text-[#5B8DEF] mb-6 shadow-sm">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Learn Basics</h3>
              <p className="text-slate-600">Start with alphabets and common phrases in the interactive Learning Modules.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white border-4 border-[#5B8DEF] rounded-full flex items-center justify-center text-2xl font-bold text-[#5B8DEF] mb-6 shadow-sm">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Practice Translating</h3>
              <p className="text-slate-600">Use our AI-powered two-way translator to understand and compose sentences.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white border-4 border-[#5B8DEF] rounded-full flex items-center justify-center text-2xl font-bold text-[#5B8DEF] mb-6 shadow-sm">3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Test Knowledge</h3>
              <p className="text-slate-600">Take quizzes to solidify your memory and track your fluency progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#5B8DEF]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to break communication barriers?</h2>
          <p className="text-blue-100 mb-10 text-lg">Join thousands learning sign language effectively with Ishario.</p>
          <Link to="/dashboard">
            <Button className="bg-white text-[#5B8DEF] hover:bg-slate-50 py-4 px-10 text-lg rounded-full">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
