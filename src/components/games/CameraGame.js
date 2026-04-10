import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, CheckCircle, XCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import { mockCameraTargets } from '../../data/mockGameData';

const CameraGame = ({ onBack }) => {
  const [targetIndex, setTargetIndex] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState(null); // 'correct', 'incorrect'
  const [score, setScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const currentTarget = mockCameraTargets[targetIndex];

  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      setDetecting(true);
      setResult(null);
    } catch (err) {
      console.error("Camera access denied or unavailable", err);
      alert("Please allow camera access to play this mode.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setDetecting(false);
    setConfidence(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Simulated detection process
  useEffect(() => {
    let interval;
    let timeout;

    if (cameraActive && detecting && !isGameOver) {
      // Fluctuate the live percentage reading
      interval = setInterval(() => {
        setConfidence(Math.floor(Math.random() * 60) + 15); // Fluctuates 15-75%
      }, 500);

      // Resolve the attempt after 5 seconds
      timeout = setTimeout(() => {
        clearInterval(interval);
        
        // Mock probability of getting it right (70% chance)
        const isSuccess = Math.random() > 0.3; 
        
        if (isSuccess) {
           setConfidence(Math.floor(Math.random() * 10) + 88); // Spike to 88-98%
           setResult('correct');
           setScore(prev => prev + 25);
           setDetecting(false);
           
           // Auto advance smoothly
           setTimeout(() => {
             nextTarget();
           }, 2000);
           
        } else {
           setConfidence(Math.floor(Math.random() * 15) + 5); // Tank to 5-20%
           setResult('incorrect');
           setDetecting(false);
           
           const fails = wrongAttempts + 1;
           setWrongAttempts(fails);
           if (fails >= 3) {
             setTimeout(() => setIsGameOver(true), 1500); // 3 strikes logic
           }
        }
      }, 5000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraActive, detecting, isGameOver, targetIndex, wrongAttempts]);

  const startGame = () => {
    setWrongAttempts(0);
    setScore(0);
    setTargetIndex(0);
    setIsGameOver(false);
    requestCamera();
  };

  const nextTarget = () => {
    setResult(null);
    setConfidence(0);
    if (targetIndex < mockCameraTargets.length - 1) {
      setTargetIndex(prev => prev + 1);
      setDetecting(true);
    } else {
      stopCamera();
    }
  };

  const retryDetect = () => {
    setResult(null);
    setConfidence(0);
    setDetecting(true);
  };

  // Game over or Finished
  if ((!cameraActive && targetIndex === mockCameraTargets.length - 1 && result) || isGameOver) {
    return (
       <div className="max-w-xl mx-auto py-10 text-center animate-in zoom-in duration-300">
         <Card className={`p-10 border-t-8 ${isGameOver ? 'border-red-500' : 'border-[#6DD3A0]'}`}>
           {isGameOver ? <XCircle size={64} className="mx-auto text-red-500 mb-4" /> : null}
           <h2 className="text-3xl font-bold text-slate-900 mb-4">
             {isGameOver ? 'Strike Out!' : 'You did it!'}
           </h2>
           <p className="text-slate-600 mb-8">
             {isGameOver ? 'You attempted 3 incorrect gestures.' : 'You successfully signed all the targets.'}
           </p>
           <div className={`text-5xl font-black mb-8 ${isGameOver ? 'text-red-500' : 'text-[#5B8DEF]'}`}>{score} <span className="text-xl text-slate-400 font-bold uppercase">XP</span></div>
           <div className="flex gap-4">
             <Button onClick={startGame} className="w-full">Play Again</Button>
             <Button onClick={() => { stopCamera(); onBack(); }} variant="outline" className="w-full">Hub</Button>
           </div>
         </Card>
       </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => { stopCamera(); onBack(); }} className="text-slate-400 hover:text-slate-600 font-medium">← Back</button>
        
        <div className="flex gap-6 items-center">
           <div className="flex gap-1 items-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full border border-slate-300 ${i < wrongAttempts ? 'bg-red-500 border-red-500' : 'bg-transparent'}`}></div>
              ))}
              <span className="text-xs ml-2 font-bold text-slate-400 uppercase">Strikes</span>
           </div>
           <div className="bg-slate-100 px-4 py-2 rounded-xl font-bold text-slate-800">
             Score: {score}
           </div>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-2 border-slate-100 flex flex-col md:flex-row shadow-lg min-h-[500px]">
        {/* Instruction Sidebar */}
        <div className="bg-slate-50 w-full md:w-1/3 p-8 border-r border-slate-100 flex flex-col justify-center items-center text-center">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Show the Sign</h2>
          <p className="text-slate-800 font-medium mb-6">Position your hands inside the camera view.</p>
          
          <div className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-slate-200 mb-8 w-full border-b-4 border-b-[#5B8DEF]">
            <span className="text-sm text-slate-400 font-bold uppercase block mb-1">Target</span>
            {currentTarget && <span className="text-6xl font-black text-[#5B8DEF]">{currentTarget.target}</span>}
          </div>

          <div className="flex flex-wrap gap-2 justify-center text-slate-400">
            {mockCameraTargets.map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === targetIndex ? 'bg-[#5B8DEF] scale-125' : i < targetIndex ? 'bg-[#6DD3A0]' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>

        {/* Camera View */}
        <div className="w-full md:w-2/3 relative bg-slate-900 group flex items-center justify-center">
          
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className={`absolute inset-0 w-full h-full object-cover rounded-r-xl transition-opacity duration-300 ${cameraActive ? 'opacity-100' : 'opacity-0'}`} 
            style={{ transform: 'scaleX(-1)' }}
          />

          {!cameraActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-slate-900">
              <Camera size={64} className="text-slate-600 mb-4" />
              <p className="text-slate-400 mb-6 max-w-sm">We need permission to access your webcam so you can practice your signs natively.</p>
              <Button onClick={requestCamera} className="bg-[#6DD3A0] hover:bg-[#5bbc8e]">Allow Camera Access</Button>
            </div>
          )}

          {cameraActive && (
            <>
              {/* Camera Toggle Button */}
              <div className="absolute top-4 right-4 z-30">
                 <button onClick={stopCamera} className="bg-slate-900/60 hover:bg-red-500/80 backdrop-blur text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all">
                   <CameraOff size={16} /> Turn Off
                 </button>
              </div>

              {/* Confidence HUD */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-xl border border-slate-700 text-white font-bold flex flex-col items-center z-20 shadow-lg">
                 <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">Match Accuracy</span>
                 <span className={`text-3xl font-black ${confidence > 80 ? 'text-green-400' : 'text-[#5B8DEF]'}`}>{confidence}%</span>
              </div>

              {/* Tracking Reticle */}
              <div className="absolute inset-8 border-2 border-dashed border-[#5B8DEF]/30 rounded-3xl pointer-events-none z-10"></div>

              {/* Status Indications */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center z-20 p-6 pointer-events-none">
                
                {detecting && (
                  <div className="bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-2">
                    <RefreshCw className="animate-spin text-[#5B8DEF]" size={20} />
                    <span className="text-white font-medium">Analyzing gesture...</span>
                  </div>
                )}

                {result === 'correct' && (
                  <div className="bg-green-500/95 backdrop-blur-md px-8 py-4 rounded-full shadow-lg flex items-center gap-4 animate-in zoom-in duration-300">
                    <CheckCircle className="text-white" size={28} />
                    <span className="text-white font-black text-xl tracking-tight">Perfect Match!</span>
                  </div>
                )}
              </div>

              {/* Bilingual Fail state overlay */}
              {result === 'incorrect' && !isGameOver && (
                 <div className="absolute inset-x-6 bottom-6 bg-slate-900/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-700 flex flex-col animate-in slide-in-from-bottom-4 z-30">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="text-red-500" size={28} />
                        <h3 className="text-white font-extrabold text-xl">Sign Not Recognized</h3>
                      </div>
                      <span className="text-red-200 font-bold bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-lg text-sm shadow-inner">Strike {wrongAttempts} of 3</span>
                    </div>
                    
                    {currentTarget && (
                      <div className="mb-6 space-y-4 bg-white/5 p-5 rounded-xl border border-white/10 shadow-inner">
                        <div>
                           <span className="bg-[#5B8DEF] text-white text-xs font-bold px-2 py-1 rounded inline-block mb-1">ENGLISH</span>
                           <p className="text-slate-300 font-medium leading-tight">{currentTarget.en}</p>
                        </div>
                        <div>
                           <span className="bg-[#6DD3A0] text-slate-900 text-xs font-bold px-2 py-1 rounded inline-block mb-1">HINDI</span>
                           <p className="text-slate-300 font-medium leading-tight">{currentTarget.hi}</p>
                        </div>
                      </div>
                    )}

                    <Button onClick={retryDetect} className="bg-red-500 hover:bg-red-600 border border-red-400 text-white w-full py-4 text-lg shadow-lg"><RefreshCw size={20} className="mr-2"/> Try Again</Button>
                 </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CameraGame;
