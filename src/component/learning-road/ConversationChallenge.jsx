import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Volume2, RotateCcw } from 'lucide-react';

const ConversationChallenge = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const conversations = [
    {
      bot: "Hi! How was your weekend?",
      keywords: ['great', 'nice', 'good', 'wonderful', 'amazing', 'fantastic', 'perfect', 'awesome'],
      hints: "Try answering with how you felt about your weekend.",
      examples: ["It was great!", "It was nice!", "Pretty good, thanks."]
    },
    {
      bot: "That's good to hear! Did you go anywhere special?",
      keywords: ['beach', 'went', 'visited', 'stayed', 'home', 'friends', 'travel', 'trip', 'yes', 'no'],
      hints: "Try mentioning a place you visited or an activity you did.",
      examples: ["Yes, I went to the beach.", "I visited my friends.", "I stayed home and relaxed."]
    },
    {
      bot: "Sounds fun! What do you plan to do next weekend?",
      keywords: ['travel', 'rest', 'home', 'plan', 'maybe', 'might', 'decided', 'haven\'t', 'visit', 'go'],
      hints: "Try sharing your plans for the next weekend.",
      examples: ["I might travel somewhere.", "Maybe I'll rest at home.", "I haven't decided yet."]
    }
  ];

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ');
  };

  const checkAnswer = (answer) => {
    const normalized = normalizeText(answer);
    const currentConversation = conversations[currentQuestion];

    if (!normalized || normalized.length < 3) {
      setFeedback('Please write a proper response.');
      setIsCorrect(false);
      setAttemptCount(attemptCount + 1);
      return;
    }

    const hasKeyword = currentConversation.keywords.some(keyword =>
      normalized.includes(normalizeText(keyword))
    );

    if (hasKeyword) {
      setIsCorrect(true);
      setFeedback('✅ Great answer!');
      const newStreak = correctStreak + 1;
      setCorrectStreak(newStreak);

      if (newStreak === 3) {
        setIsCompleted(true);
        setFeedback('🎉 Excellent! You passed the Conversation Challenge!');
      } else {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setUserInput('');
          setFeedback('');
          setIsCorrect(null);
          setAttemptCount(0);
        }, 1500);
      }
    } else {
      setIsCorrect(false);
      setFeedback(`❌ ${currentConversation.hints}`);
      setAttemptCount(attemptCount + 1);
      setCorrectStreak(0);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setUserInput('');
    setFeedback('');
    setIsCorrect(null);
    setCorrectStreak(0);
    setIsCompleted(false);
    setAttemptCount(0);
  };

  if (isCompleted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg">
        <div className="text-center">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-green-700 mb-2">
            Congratulations! 🎉
          </h2>
          <p className="text-green-600 mb-6">
            You successfully completed the Conversation Challenge!
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button
              onClick={onComplete}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Continue to Next Level
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = conversations[currentQuestion];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            Question {currentQuestion + 1} of {conversations.length}
          </span>
          <span className="text-sm font-semibold text-green-600">
            ✓ Correct: {correctStreak}/3
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / conversations.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Conversation Box */}
      <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-blue-500 shadow">
        <div className="flex items-start gap-3">
          <div className="text-2xl">👩‍💼</div>
          <div>
            <p className="text-gray-800 font-medium">{current.bot}</p>
            <p className="text-xs text-gray-500 mt-1">Bot</p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Response:
        </label>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your response here..."
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none text-black"
          rows="3"
          disabled={isCorrect === true}
        />
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-start gap-2 ${
            isCorrect === true
              ? 'bg-green-100 border border-green-300'
              : 'bg-red-100 border border-red-300'
          }`}
        >
          {isCorrect === true ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <p className={`text-sm ${isCorrect === true ? 'text-green-800' : 'text-red-800'}`}>
            {feedback}
          </p>
        </div>
      )}

      {/* Examples */}
      <div className="mb-6 p-4 bg-indigo-100 rounded-lg">
        <p className="text-xs font-semibold text-indigo-700 mb-2">Good Examples:</p>
        <ul className="text-xs text-indigo-700 space-y-1">
          {current.examples.map((example, idx) => (
            <li key={idx}>• {example}</li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={() => checkAnswer(userInput)}
          disabled={isCorrect === true || !userInput.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> Check Answer
        </button>
      </div>

      {/* Attempt Counter */}
      {attemptCount > 0 && (
        <p className="text-xs text-gray-500 text-right mt-3">
          Attempts: {attemptCount}
        </p>
      )}
    </div>
  );
};

export default ConversationChallenge;
