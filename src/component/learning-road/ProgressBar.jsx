import React from 'react';

const ProgressBar = ({ currentLevel, totalLevels }) => {
  const percentage = Math.round((currentLevel / totalLevels) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
