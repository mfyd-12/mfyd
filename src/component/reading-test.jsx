import React, { useState } from 'react';

export default function ReadingTest() {
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const readingContent = {
    title: "The Importance of Reading",
    content: `Reading is a fundamental skill that opens doors to knowledge and imagination. It helps us learn about new ideas, cultures, and perspectives. Through reading, we can travel to distant places, meet interesting characters, and expand our understanding of the world.

Regular reading improves vocabulary, comprehension, and critical thinking skills. It also enhances our ability to communicate effectively and express our thoughts clearly. Whether it's books, articles, or digital content, reading enriches our lives in countless ways.

Studies show that people who read regularly have better memory, reduced stress levels, and improved focus. Reading before bedtime can also help in getting better sleep. In our fast-paced digital world, taking time to read is more important than ever.`,
    questions: [
      {
        id: 1,
        question: "What is the main idea of the passage?",
        options: [
          { id: 'a', text: "The benefits of reading", correct: true },
          { id: 'b', text: "How to improve reading skills", correct: false },
          { id: 'c', text: "Digital vs. traditional reading", correct: false },
          { id: 'd', text: "Reading before bedtime", correct: false }
        ]
      },
      {
        id: 2,
        question: "According to the passage, reading helps improve:",
        options: [
          { id: 'a', text: "Only vocabulary", correct: false },
          { id: 'b', text: "Vocabulary, comprehension, and critical thinking", correct: true },
          { id: 'c', text: "Only communication skills", correct: false },
          { id: 'd', text: "Only memory", correct: false }
        ]
      },
      {
        id: 3,
        question: "What are the benefits of regular reading mentioned in the passage?",
        options: [
          { id: 'a', text: "Better memory only", correct: false },
          { id: 'b', text: "Reduced stress only", correct: false },
          { id: 'c', text: "Better memory, reduced stress, and improved focus", correct: true },
          { id: 'd', text: "Improved focus only", correct: false }
        ]
      }
    ]
  };

  const handleAnswer = (questionId, answerId) => {
    setSelectedAnswer({
      ...selectedAnswer,
      [questionId]: answerId
    });
  };

  const checkAnswers = () => {
    let currentScore = 0;
    readingContent.questions.forEach(question => {
      if (selectedAnswer[question.id] === question.options.find(opt => opt.correct).id) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setShowResult(true);
  };

  const getResultMessage = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return {
      title: "Perfect! 🌟",
      message: "Excellent work! You've mastered this reading comprehension test.",
      color: "bg-green-500",
      emoji: "🏆"
    };
    if (percentage >= 70) return {
      title: "Great Job! 👏",
      message: "Very good performance! Keep up the great work.",
      color: "bg-blue-500",
      emoji: "🌟"
    };
    if (percentage >= 50) return {
      title: "Good Effort! 💪",
      message: "You're on the right track. Keep practicing to improve.",
      color: "bg-yellow-500",
      emoji: "📚"
    };
    return {
      title: "Keep Going! 🎯",
      message: "Don't give up! Practice makes perfect.",
      color: "bg-red-500",
      emoji: "💪"
    };
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {!showResult ? (
          <>
            {/* Reading Content */}
            <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{readingContent.title}</h1>
              <div className="prose prose-lg">
                {readingContent.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {readingContent.questions.map((question, index) => (
                <div key={question.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {index + 1}. {question.question}
                  </h3>
                  <div className="space-y-3">
                    {question.options.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(question.id, option.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedAnswer[question.id] === option.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-400'
                        }`}
                      >
                        <span className="font-medium">{option.id.toUpperCase()})</span> {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                onClick={checkAnswers}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
              >
                Check Answers
              </button>
            </div>
          </>
        ) : (
          // Result Display
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fadeIn">
            {(() => {
              const result = getResultMessage(score, readingContent.questions.length);
              return (
                <>
                  <div className={`inline-flex p-6 rounded-full mb-6 ${result.color}`}>
                    <span className="text-4xl">{result.emoji}</span>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {result.title}
                  </h2>
                  
                  <div className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                    {score} / {readingContent.questions.length}
                  </div>
                  
                  <p className="text-xl text-gray-600 mb-8">
                    {result.message}
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setShowResult(false);
                        setSelectedAnswer({});
                        setScore(0);
                      }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
                    >
                      Try Again
                    </button>
                    
                    <a
                        href="/"
                    className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300"
                    >
                      Back to Lessons
                    </a>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}