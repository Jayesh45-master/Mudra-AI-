import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Type, Volume2, Globe, Mic, MicOff, Trash2, VolumeX } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { findSignImage } from '../services/translatorService';

const MOCK_DETECTIONS = [
  { word: 'Hello', accuracy: 94 },
  { word: 'How', accuracy: 88 },
  { word: 'Are', accuracy: 91 },
  { word: 'You', accuracy: 86 },
  { word: 'Thank You', accuracy: 92 },
  { word: 'Please', accuracy: 89 },
  { word: 'Help', accuracy: 95 },
  { word: 'Yes', accuracy: 90 },
  { word: 'No', accuracy: 93 },
  { word: 'Sorry', accuracy: 85 },
  { word: 'Good', accuracy: 87 },
  { word: 'Morning', accuracy: 82 },
  { word: 'Doctor', accuracy: 91 },
  { word: 'Water', accuracy: 88 },
  { word: 'Emergency', accuracy: 96 },
  { word: 'School', accuracy: 84 },
  { word: 'Home', accuracy: 90 },
  { word: 'Fine', accuracy: 87 },
  { word: 'Name', accuracy: 83 },
  { word: 'Walk', accuracy: 86 },
];

const TranslatorPage = () => {
  const [activeTab, setActiveTab] = useState('textToSign');
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('English');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Sign-to-text state
  const [cameraActive, setCameraActive] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [detectedWords, setDetectedWords] = useState([]);
  const [currentDetection, setCurrentDetection] = useState(null);
  const [liveAccuracy, setLiveAccuracy] = useState(0);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detectionInterval = useRef(null);
  const autoSpeakRef = useRef(true);

  // Text-to-Sign logic — only show signs for words confirmed with a space
  const getSimulatedSigns = (text) => {
    if (!text) return [];

    // Only process words that are followed by a space (completed words)
    const endsWithSpace = text.endsWith(' ');
    const allWords = text.trim().toLowerCase().split(/\s+/);
    
    // If user hasn't pressed space yet after the last word, exclude it
    const words = endsWithSpace ? allWords : allWords.slice(0, -1);
    if (words.length === 0) return [];

    let result = [];

    for (const word of words) {
        const cleanWord = word.replace(/[^a-z]/g, '');
        if (!cleanWord) continue;

        const exactMatchUrl = findSignImage(cleanWord);
        if (exactMatchUrl) {
            const displayWord = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1);
            result.push({ type: 'word', text: displayWord, imageSrc: exactMatchUrl });
        } else {
            const letters = cleanWord.toUpperCase().split('');
            letters.forEach(char => {
               result.push({ type: 'letter', text: char, imageSrc: `/signs/${char}.png` });
            });
        }
    }

    return result;
  };

  // Camera controls
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      setDetecting(true);
      startMockDetection();
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Please allow camera access to use Sign to Text.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
      detectionInterval.current = null;
    }
    setCameraActive(false);
    setDetecting(false);
    setCurrentDetection(null);
    setLiveAccuracy(0);
  };

  useEffect(() => {
    return () => stopCamera();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulated gesture detection loop
  const startMockDetection = () => {
    let tickCount = 0;
    detectionInterval.current = setInterval(() => {
      tickCount++;
      // Fluctuate the live accuracy meter
      setLiveAccuracy(Math.floor(Math.random() * 40) + 30);

      // Every ~4 seconds, lock in a detection
      if (tickCount % 8 === 0) {
        const pick = MOCK_DETECTIONS[Math.floor(Math.random() * MOCK_DETECTIONS.length)];
        const finalAccuracy = Math.floor(Math.random() * 12) + 82; // 82-94%
        setLiveAccuracy(finalAccuracy);
        setCurrentDetection({ ...pick, accuracy: finalAccuracy });
        setDetectedWords(prev => [...prev, { ...pick, accuracy: finalAccuracy, timestamp: Date.now() }]);
        
        // Auto-speak the detected word
        if (autoSpeakRef.current) {
          speakText(pick.word);
        }
      }
    }, 500);
  };

  // Voice output using Web Speech API
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.9;
      utter.pitch = 1;
      window.speechSynthesis.speak(utter);
    }
  };

  const speakAllDetected = () => {
    const sentence = detectedWords.map(d => d.word).join(' ');
    if (sentence) speakText(sentence);
  };

  const clearDetections = () => {
    setDetectedWords([]);
    setCurrentDetection(null);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const toggleAutoSpeak = () => {
    const newVal = !autoSpeak;
    setAutoSpeak(newVal);
    autoSpeakRef.current = newVal;
    if (!newVal && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Speech Recognition for Text-to-Sign voice input
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    let finalTranscript = inputText;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += (finalTranscript ? ' ' : '') + transcript;
        } else {
          interimTranscript = transcript;
        }
      }
      setInputText(finalTranscript + (interimTranscript ? ' ' + interimTranscript : ''));
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Translation Hub</h1>
        <p className="text-slate-500 mt-2">Translate instantly between Text and Sign Language.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 p-1 rounded-xl inline-flex shadow-inner">
            <button
              onClick={() => { setActiveTab('textToSign'); stopCamera(); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'textToSign' ? 'bg-white shadow text-[#5B8DEF]' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Type size={18} /> Text to Sign
            </button>
            <button
              onClick={() => setActiveTab('signToText')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'signToText' ? 'bg-white shadow text-[#6DD3A0]' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Camera size={18} /> Sign to Text
            </button>
          </div>
        </div>

        {/* Content Area */}
        <Card className="min-h-[500px]">
          {activeTab === 'textToSign' ? (
            <div className="flex flex-col h-full space-y-6">
              {/* Input section */}
              <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5B8DEF] transition-all">
                <div className="bg-slate-50 flex items-center px-4 border-r border-slate-200 gap-2 text-slate-600">
                  <Globe size={18} />
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isListening ? 'Listening... speak now' : 'Type or speak to translate to ISL...'}
                  className="flex-1 p-4 text-lg focus:outline-none"
                />
                <button 
                  onClick={toggleListening}
                  className={`px-4 transition-all border-l border-slate-200 flex items-center gap-1 ${
                    isListening 
                      ? 'bg-red-50 text-red-500 hover:bg-red-100 animate-pulse' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
              </div>
              
              {isListening && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-3 rounded-xl animate-in slide-in-from-top-2 duration-300">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-sm font-medium text-red-700">Listening for speech... Speak clearly into your microphone.</span>
                  <button onClick={stopListening} className="ml-auto text-xs font-bold text-red-500 hover:text-red-700 bg-white px-3 py-1 rounded-lg border border-red-200">Stop</button>
                </div>
              )}

              {/* Output Display */}
              <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col">
                <h3 className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wide">Sign Language Output</h3>
                
                {inputText.trim() ? (
                  <div className="flex flex-wrap gap-4 pb-4">
                    {getSimulatedSigns(inputText).map((signObj, idx) => (
                      <div key={idx} className="flex flex-col items-center animate-in zoom-in duration-200" style={{ animationDelay: `${idx * 50}ms` }}>
                       <div className="w-32 h-32 bg-white rounded-xl border border-slate-200 overflow-hidden mb-2 shadow-sm p-3 flex items-center justify-center relative hover:border-[#5B8DEF] transition-colors">
                         <img src={signObj.imageSrc} alt={signObj.text} className="w-full h-full object-contain mix-blend-multiply" />
                       </div>
                       <span className="font-medium text-slate-700 text-base">{signObj.text}</span>
                     </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                    <Type size={48} className="mb-4 opacity-50" />
                    <p>Start typing to see the signs...</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ========================================= */
            /* SIGN TO TEXT - Full Webcam + Detection UI */
            /* ========================================= */
            <div className="flex flex-col h-full gap-6">
              {/* Camera Feed */}
              <div className="relative w-full h-[400px] bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex flex-col items-center justify-center">
                
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${cameraActive ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transform: 'scaleX(-1)' }}
                />

                {!cameraActive ? (
                  <div className="text-center z-10 flex flex-col items-center">
                    <Camera size={64} className="text-slate-600 mb-4" />
                    <p className="text-slate-400 mb-6 max-w-sm">Enable your camera to start detecting sign language gestures in real-time.</p>
                    <Button onClick={startCamera} className="bg-[#6DD3A0] hover:bg-[#5bbc8e] text-lg px-8 py-3">
                      <Camera size={20} className="mr-2" /> Enable Camera
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Tracking Reticle */}
                    <div className="absolute inset-6 border-2 border-dashed border-[#6DD3A0]/40 rounded-2xl pointer-events-none z-10"></div>

                    {/* Camera Off Button */}
                    <div className="absolute top-4 right-4 z-30">
                      <button onClick={stopCamera} className="bg-slate-900/70 hover:bg-red-500/80 backdrop-blur text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg">
                        <CameraOff size={16} /> Turn Off
                      </button>
                    </div>

                    {/* Live Accuracy HUD */}
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur px-5 py-3 rounded-xl border border-slate-700 text-white z-20 shadow-lg">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Live Accuracy</div>
                      <div className={`text-3xl font-black tabular-nums ${liveAccuracy > 75 ? 'text-green-400' : liveAccuracy > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {liveAccuracy}%
                      </div>
                    </div>

                    {/* Analyzing Indicator */}
                    {detecting && !currentDetection && (
                      <div className="absolute bottom-6 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-slate-700 flex items-center gap-3 z-20 animate-pulse">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6DD3A0] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6DD3A0]"></span>
                        </span>
                        <span className="text-white font-medium">Analyzing gesture...</span>
                      </div>
                    )}

                    {/* Current Detection Badge */}
                    {currentDetection && (
                      <div className="absolute bottom-6 bg-[#6DD3A0]/95 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-20 animate-in zoom-in duration-300">
                        <span className="text-white font-black text-2xl">{currentDetection.word}</span>
                        <span className="bg-white/30 text-white text-sm font-bold px-3 py-1 rounded-full">{currentDetection.accuracy}%</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Detected Text Output + Controls */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                    <Mic size={16} /> Detected Output
                  </h3>
                  <div className="flex gap-2 items-center">
                    {/* Auto-Speak Toggle */}
                    <button 
                      onClick={toggleAutoSpeak}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm border ${
                        autoSpeak 
                          ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' 
                          : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {autoSpeak ? <Volume2 size={16} /> : <VolumeX size={16} />}
                      {autoSpeak ? 'Auto-Speak ON' : 'Auto-Speak OFF'}
                    </button>
                    <button 
                      onClick={speakAllDetected}
                      disabled={detectedWords.length === 0}
                      className="flex items-center gap-2 px-4 py-2 bg-[#5B8DEF] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                    >
                      <Volume2 size={16} /> Speak All
                    </button>
                    <button 
                      onClick={clearDetections}
                      disabled={detectedWords.length === 0}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={16} /> Clear
                    </button>
                  </div>
                </div>
                
                {detectedWords.length > 0 ? (
                  <div className="space-y-4">
                    {/* Sentence Display */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                      <p className="text-2xl text-slate-800 font-semibold leading-relaxed">
                        {detectedWords.map((d, idx) => (
                          <span key={idx} className="inline-block animate-in slide-in-from-bottom-2 duration-300">
                            {d.word}
                            {idx < detectedWords.length - 1 ? ' ' : ''}
                          </span>
                        ))}
                        <span className="animate-pulse text-[#6DD3A0]">|</span>
                      </p>
                    </div>

                    {/* Individual word accuracy chips */}
                    <div className="flex flex-wrap gap-2">
                      {detectedWords.map((d, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm animate-in zoom-in duration-200" style={{ animationDelay: `${idx * 80}ms` }}>
                          <span className="font-semibold text-slate-800">{d.word}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            d.accuracy >= 90 ? 'bg-green-100 text-green-700' : 
                            d.accuracy >= 80 ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            {d.accuracy}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <Camera size={36} className="mx-auto mb-3 opacity-40" />
                    <p className="font-medium">{cameraActive ? 'Perform a sign gesture in front of the camera...' : 'Enable camera to start detecting sign language.'}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TranslatorPage;
