import React from 'react';
import { CheckCircle, Lock, Play, Rocket } from 'lucide-react';

export default function Level({ index, title, status = 'locked', onStart }) {
  const isLocked = status === 'locked';
  const isComplete = status === 'complete';
  const isOpen = status === 'open' || isComplete;

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-md transition-transform ${isComplete ? 'bg-green-500 scale-105' : isOpen ? 'bg-yellow-400' : 'bg-gray-300'} text-white`}>
          {isComplete ? <CheckCircle className="w-8 h-8" /> : isOpen ? <Rocket className="w-7 h-7" /> : <Lock className="w-6 h-6" />}
        </div>
        <div className="mt-2 text-center">
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs text-blue-100">{isComplete ? '✅ مكتملة' : isLocked ? '🔒 مغلقة' : '🚀 مفتوحة'}</div>
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white/10 p-4 rounded-lg">
          <div className="text-sm text-gray-100">A small checkpoint quiz to unlock the next level.</div>
          <div className="mt-3 flex gap-2">
            <button onClick={onStart} disabled={isLocked} className={`px-4 py-2 rounded-lg font-semibold ${isLocked ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-yellow-300 hover:text-blue-700'}`}>
              <Play className="inline w-4 h-4 mr-2" /> Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
