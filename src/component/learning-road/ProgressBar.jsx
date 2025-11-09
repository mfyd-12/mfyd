import React from 'react';

export default function ProgressBar({ percent = 0 }) {
  return (
    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
      <div className="h-3 bg-gradient-to-r from-yellow-300 to-blue-600 transition-all" style={{ width: `${percent}%` }} />
    </div>
  );
}
