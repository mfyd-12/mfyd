import React, { useState, useEffect } from 'react';
import { Play, Volume2, CheckCircle, XCircle, SkipForward } from 'lucide-react';

/**
 * ListeningChallenge Component - Level 4
 * 
 * Features:
 * - 3 listening exercises with audio
 * - User types the sentence they hear
 * - Exact text matching validation
 * - Progress tracking with visual feedback
 * - Auto-advance on correct answer
 * - Success notification when all completed
 */

export default function ListeningChallenge({ onComplete, onCancel }) {
  // Challenge data with audio and correct answers
  const challenges = [
    {
      id: 1,
      audio: '/ElevenLabs_2025-11-11T13_17_58_Rachel_pre_sp100_s50_sb75_se0_b_m2.mp3',
      correctAnswer: 'The sun was setting, painting the sky in shades of pink and orange.'
    },
    {
      id: 2,
      audio: '/ElevenLabs_2025-11-11T13_21_00_Rachel_pre_sp100_s50_sb75_se0_b_m2.mp3',
      correctAnswer: "She couldn't believe how fast the week had gone by."
    },
    {
      id: 3,
      audio: '/ElevenLabs_2025-11-11T13_23_07_Rachel_pre_sp100_s50_sb75_se0_b_m2.mp3',
      correctAnswer: 'A gentle breeze carried the scent of fresh flowers through the garden.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(['', '', '']);
  const [checkResults, setCheckResults] = useState([null, null, null]); // null, true, or false
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [hints, setHints] = useState(['', '', '']);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

  // Normalize text for accurate comparison
  const normalizeText = (text) => {
    return text
      .toString()
      .replace(/[''`]/g, "'") // normalize all types of apostrophes and backticks
      .replace(/["″‟]/g, '"') // normalize quotation marks
      .toLowerCase()
      .replace(/\s+/g, ' ') // normalize whitespace
      .trim();
  };

  // Check if all challenges are completed
  useEffect(() => {
    const allChecked = checkResults.every((result) => result !== null);
    const allCorrect = checkResults.every((result) => result === true);

    if (allChecked && allCorrect) {
      // Show completion screen for 2 seconds then trigger callback
      setShowCompletionScreen(true);
      setTimeout(() => {
        onComplete && onComplete(true);
      }, 2000);
    }
  }, [checkResults, onComplete]);

  const handleCheckAnswer = () => {
    const currentChallenge = challenges[currentIndex];
    const userText = userAnswers[currentIndex];
    const isCorrect =
      normalizeText(userText) === normalizeText(currentChallenge.correctAnswer);

    // Debug logging
    console.log('=== Challenge Validation ===');
    console.log('Challenge ID:', currentChallenge.id);
    console.log('User Input:', userText);
    console.log('User Normalized:', normalizeText(userText));
    console.log('Expected:', currentChallenge.correctAnswer);
    console.log('Expected Normalized:', normalizeText(currentChallenge.correctAnswer));
    console.log('Is Correct:', isCorrect);
    console.log('==========================');

    // Update result
    const newResults = [...checkResults];
    newResults[currentIndex] = isCorrect;
    setCheckResults(newResults);

    if (isCorrect) {
      // Clear hint and mark as auto-advancing
      const newHints = [...hints];
      newHints[currentIndex] = '';
      setHints(newHints);

      // Auto-advance after 1 second if not the last challenge
      if (currentIndex < challenges.length - 1) {
        setIsAutoAdvancing(true);
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setIsAutoAdvancing(false);
        }, 1000);
      }
    } else {
      // Show hint for incorrect answer
      const newHints = [...hints];
      newHints[currentIndex] = 'Not quite right. Check your spelling, punctuation, and spacing. Try again!';
      setHints(newHints);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = value;
    setUserAnswers(newAnswers);

    // Clear hint when user starts typing
    if (hints[currentIndex]) {
      const newHints = [...hints];
      newHints[currentIndex] = '';
      setHints(newHints);
    }

    // Clear result when user modifies their answer
    const newResults = [...checkResults];
    newResults[currentIndex] = null;
    setCheckResults(newResults);
  };

  const handleSkip = () => {
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRetry = () => {
    // Reset all answers and results
    setUserAnswers(['', '', '']);
    setCheckResults([null, null, null]);
    setHints(['', '', '']);
    setCurrentIndex(0);
  };

  // Show completion screen
  if (showCompletionScreen) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="text-center space-y-4">
          <div className="text-5xl font-bold animate-bounce">🎉</div>
          <div className="text-3xl font-bold text-green-600">Great job!</div>
          <div className="text-xl text-gray-700">You passed Level 4 - Listening Challenge</div>
          <div className="text-sm text-gray-600">جميع الإجابات صحيحة! Well done!</div>
        </div>
        <div className="w-full bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-green-700 font-semibold text-center">
            ✅ All answers correct! Next level unlocked.
          </div>
        </div>
      </div>
    );
  }

  const currentChallenge = challenges[currentIndex];
  const currentResult = checkResults[currentIndex];
  const currentHint = hints[currentIndex];

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex justify-between items-center">
        <div className="text-sm font-semibold text-gray-700">
          Challenge {currentIndex + 1} of {challenges.length}
        </div>
        <div className="flex gap-2">
          {challenges.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors ${
                checkResults[idx] === true
                  ? 'bg-green-500'
                  : checkResults[idx] === false
                  ? 'bg-red-500'
                  : idx === currentIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Audio player section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl">🎧</div>
          <div className="text-center">
            <h3 className="font-bold text-gray-800 mb-2">Listen carefully to the sentence</h3>
            <p className="text-sm text-gray-600">
              Click play to hear the audio, then type what you hear below.
            </p>
          </div>
          <audio
            controls
            src={currentChallenge.audio}
            className="w-full max-w-sm h-10 bg-white rounded-lg"
          />
        </div>
      </div>

      {/* Input area */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Type the sentence you heard:
        </label>
        <input
          type="text"
          value={userAnswers[currentIndex]}
          onChange={handleInputChange}
          disabled={isAutoAdvancing}
          placeholder="Write the sentence here..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder-gray-400"
          autoFocus
        />
      </div>

      {/* Feedback section */}
      {currentResult !== null && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 ${
            currentResult
              ? 'bg-green-50 border-l-4 border-green-500'
              : 'bg-red-50 border-l-4 border-red-500'
          }`}
        >
          {currentResult ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-green-800">✅ Correct!</div>
                <div className="text-sm text-green-700">Great job! Moving to the next challenge...</div>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-red-800">❌ Not quite right</div>
                <div className="text-sm text-red-700">
                  Your answer: "{userAnswers[currentIndex]}"
                </div>
                <div className="text-sm text-red-700 mt-1">
                  Correct answer: "{currentChallenge.correctAnswer}"
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hint section */}
      {currentHint && (
        <div className="p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-500">
          <div className="text-sm text-yellow-800">
            <strong>💡 Hint:</strong> {currentHint}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 justify-end pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
        >
          إلغاء
        </button>

        {currentResult === false && (
          <>
            <button
              onClick={handleSkip}
              className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition font-medium flex items-center gap-2"
            >
              <SkipForward className="w-4 h-4" />
              Skip
            </button>
            <button
              onClick={handleCheckAnswer}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Try Again
            </button>
          </>
        )}

        {currentResult === null && (
          <button
            onClick={handleCheckAnswer}
            disabled={!userAnswers[currentIndex].trim()}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Check Answer
          </button>
        )}

        {currentResult === true && currentIndex < challenges.length - 1 && (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-medium flex items-center gap-2"
          >
            <SkipForward className="w-4 h-4" />
            Next Challenge
          </button>
        )}
      </div>

      {/* Challenge completion cards (bottom) */}
      <div className="pt-4 border-t border-gray-200 space-y-2">
        <h4 className="text-sm font-semibold text-gray-700">Challenges Overview</h4>
        <div className="space-y-2">
          {challenges.map((challenge, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition ${
                idx === currentIndex
                  ? 'bg-blue-100 border border-blue-400'
                  : checkResults[idx] === true
                  ? 'bg-green-100 border border-green-400'
                  : checkResults[idx] === false
                  ? 'bg-red-100 border border-red-400'
                  : 'bg-gray-100 border border-gray-300'
              }`}
              onClick={() => idx !== currentIndex && setCurrentIndex(idx)}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-white text-gray-700">
                {idx + 1}
              </div>
              <div className="flex-1 text-sm">
                {checkResults[idx] === true ? (
                  <div className="text-green-700 font-semibold">✅ Completed</div>
                ) : checkResults[idx] === false ? (
                  <div className="text-red-700 font-semibold">❌ Needs Review</div>
                ) : idx === currentIndex ? (
                  <div className="text-blue-700 font-semibold">▶ Current</div>
                ) : (
                  <div className="text-gray-700">Pending</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
