import { useState, useEffect } from 'react';
import { Book, Users, LifeBuoy, Headset } from "lucide-react";
import { Link } from "react-router";
import PerosnalizedSupport from './PerosnalizedSupport';

export default function ChatSidebar() {
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale');
  const [timer, setTimer] = useState(4);

  const breathingPhases = [
    { name: 'inhale', duration: 4 },
    { name: 'hold', duration: 7 },
    { name: 'exhale', duration: 8 }
  ];

  useEffect(() => {
    if (!isBreathingActive) return;

    const phase = breathingPhases.find(p => p.name === currentPhase);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) return prev - 1;
        
        // Move to next phase
        const currentIndex = breathingPhases.findIndex(p => p.name === currentPhase);
        const nextIndex = (currentIndex + 1) % breathingPhases.length;
        setCurrentPhase(breathingPhases[nextIndex].name);
        return breathingPhases[nextIndex].duration;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive, currentPhase]);

  const startBreathing = () => {
    setIsBreathingActive(true);
    setCurrentPhase('inhale');
    setTimer(4);
  };

  const stopBreathing = () => {
    setIsBreathingActive(false);
  };

  return (
    <div className="w-1/3 h-screen bg-gradient-to-b from-[#FFD5B5] to-[#FFEAD5] p-6 flex flex-col border-r border-gray-300 shadow-lg">
      {/* Logo/Header */}
      <div className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
        <span className="bg-white p-2 rounded-lg shadow-md">
          <LifeBuoy className="text-blue-500" />
        </span>
        HOPE
      </div>

      {/* Content Area */}
      <div className="flex flex-col space-y-3 flex-grow">
        {isBreathingActive ? (
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">4-7-8 Breathing Exercise</h2>
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute animate-pulse">
                <div className={`w-32 h-32 rounded-full bg-indigo-200 transition-all duration-1000 
                  ${currentPhase === 'inhale' ? 'scale-150' : 
                     currentPhase === 'exhale' ? 'scale-75' : 'scale-125'}`}
                />
              </div>
              <span className="text-5xl font-bold text-indigo-600 z-10">{timer}</span>
            </div>
            <p className="text-xl font-semibold text-gray-700 capitalize">
              {currentPhase} ({{
                inhale: '4 seconds',
                hold: '7 seconds',
                exhale: '8 seconds'
              }[currentPhase]})
            </p>
            <button 
              onClick={stopBreathing}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Stop Exercise
            </button>
          </div>
        ) : (
          <>
            <Link to="/blogs" className="w-full">
              <button className="flex items-center gap-3 p-3 w-full rounded-lg cursor-pointer bg-white shadow-md transition-all transform hover:scale-105 hover:bg-indigo-500 hover:text-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <Book className="text-blue-500" />
                <span>Blog</span>
              </button>
            </Link>

            <Link to="/tech-community" className="w-full">
              <button className="flex items-center gap-3 p-3 w-full rounded-lg cursor-pointer bg-white shadow-md transition-all transform hover:scale-105 hover:bg-indigo-500 hover:text-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <Users className="text-blue-500" />
                <span>Tech Community</span>
              </button>
            </Link>

            <Link to="/support" className="w-full">
              <button className="flex items-center gap-3 p-3 w-full rounded-lg cursor-pointer bg-white shadow-md transition-all transform hover:scale-105 hover:bg-indigo-500 hover:text-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <LifeBuoy className="text-blue-500" />
                <span>Support</span>
              </button>
            </Link>  

            <button 
              onClick={startBreathing}
              className="flex items-center gap-3 p-3 w-full rounded-lg cursor-pointer bg-white shadow-md transition-all transform hover:scale-105 hover:bg-indigo-500 hover:text-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <Headset className="text-blue-500" />
              <span>Breathing Support</span>
            </button>

            <PerosnalizedSupport />
          </>
        )}
      </div>
    </div>
  );
}