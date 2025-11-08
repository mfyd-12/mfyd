import React, { useState } from 'react';
import { Award } from 'lucide-react';

export default function VocabularyTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const vocabularyQuestions = [
    {
      id: 1,
      word: "مدرسة",
      options: [
        { id: 'a', text: "School", correct: true },
        { id: 'b', text: "House", correct: false },
        { id: 'c', text: "Book", correct: false },
        { id: 'd', text: "Pen", correct: false }
      ]
    },
    {
      id: 2,
      word: "كتاب",
      options: [
        { id: 'a', text: "Pencil", correct: false },
        { id: 'b', text: "Book", correct: true },
        { id: 'c', text: "Paper", correct: false },
        { id: 'd', text: "Desk", correct: false }
      ]
    },
    {
      id: 3,
      word: "قلم",
      options: [
        { id: 'a', text: "Book", correct: false },
        { id: 'b', text: "Table", correct: false },
        { id: 'c', text: "Pen", correct: true },
        { id: 'd', text: "Chair", correct: false }
      ]
    },
    {
      id: 4,
      word: "منزل",
      options: [
        { id: 'a', text: "Car", correct: false },
        { id: 'b', text: "Street", correct: false },
        { id: 'c', text: "Garden", correct: false },
        { id: 'd', text: "House", correct: true }
      ]
    },
    {
      id: 5,
      word: "طعام",
      options: [
        { id: 'a', text: "Food", correct: true },
        { id: 'b', text: "Water", correct: false },
        { id: 'c', text: "Drink", correct: false },
        { id: 'd', text: "Meal", correct: false }
      ]
    },
    {
      id: 6,
      word: "سيارة",
      options: [
        { id: 'a', text: "Bike", correct: false },
        { id: 'b', text: "Bus", correct: false },
        { id: 'c', text: "Car", correct: true },
        { id: 'd', text: "Train", correct: false }
      ]
    },
    {
      id: 7,
      word: "هاتف",
      options: [
        { id: 'a', text: "Computer", correct: false },
        { id: 'b', text: "Phone", correct: true },
        { id: 'c', text: "Tablet", correct: false },
        { id: 'd', text: "Laptop", correct: false }
      ]
    },
    {
      id: 8,
      word: "حاسوب",
      options: [
        { id: 'a', text: "Phone", correct: false },
        { id: 'b', text: "Tablet", correct: false },
        { id: 'c', text: "Computer", correct: true },
        { id: 'd', text: "Screen", correct: false }
      ]
    },
    {
      id: 9,
      word: "باب",
      options: [
        { id: 'a', text: "Window", correct: false },
        { id: 'b', text: "Wall", correct: false },
        { id: 'c', text: "Room", correct: false },
        { id: 'd', text: "Door", correct: true }
      ]
    },
    {
      id: 10,
      word: "نافذة",
      options: [
        { id: 'a', text: "Window", correct: true },
        { id: 'b', text: "Door", correct: false },
        { id: 'c', text: "Wall", correct: false },
        { id: 'd', text: "Roof", correct: false }
      ]
    }
  ];

  const handleAnswer = (questionId, answerId) => {
    setAnswers({
      ...answers,
      [questionId]: answerId
    });
  };

  const handleNext = () => {
    if (currentQuestion < vocabularyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    vocabularyQuestions.forEach(question => {
      if (answers[question.id] === question.options.find(opt => opt.correct).id) {
        correct++;
      }
    });
    setScore(correct);
    return correct;
  };

  const getResultMessage = (score) => {
    const percentage = (score / vocabularyQuestions.length) * 100;
    if (percentage === 100) return {
      title: "ممتاز! 🌟",
      message: "لديك مخزون ممتاز من المفردات الإنجليزية!",
      color: "bg-green-500"
    };
    if (percentage >= 70) return {
      title: "جيد جداً! 👏",
      message: "أداء رائع! استمر في تطوير مفرداتك",
      color: "bg-blue-500"
    };
    if (percentage >= 50) return {
      title: "جيد! 💪",
      message: "أنت في الطريق الصحيح. واصل التعلم!",
      color: "bg-yellow-500"
    };
    return {
      title: "استمر! 🎯",
      message: "كل بداية صعبة. واصل المحاولة!",
      color: "bg-red-500"
    };
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {!showResult ? (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">اختبار المفردات</h3>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full font-semibold">
                  السؤال {currentQuestion + 1} من {vocabularyQuestions.length}
                </span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / vocabularyQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="p-8">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {vocabularyQuestions[currentQuestion].word}
                </h2>
                <p className="text-lg text-gray-600">اختر المعنى الصحيح باللغة الإنجليزية</p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {vocabularyQuestions[currentQuestion].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(vocabularyQuestions[currentQuestion].id, option.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                      answers[vocabularyQuestions[currentQuestion].id] === option.id
                        ? 'border-orange-500 bg-orange-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg font-medium text-gray-800">{option.text}</span>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentQuestion > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    السابق ⬅️
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                >
                  {currentQuestion === vocabularyQuestions.length - 1 ? 'إنهاء الاختبار' : 'التالي ➡️'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Result Display
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fadeIn">
            {(() => {
              const result = getResultMessage(score);
              return (
                <>
                  <div className={`inline-flex p-6 rounded-full mb-6 ${result.color}`}>
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {result.title}
                  </h2>
                  
                  <div className="text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
                    {score} / {vocabularyQuestions.length}
                  </div>
                  
                  <p className="text-xl text-gray-600 mb-8">
                    {result.message}
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setCurrentQuestion(0);
                        setAnswers({});
                        setShowResult(false);
                      }}
                      className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300"
                    >
                      حاول مرة أخرى
                    </button>
                    
                    <button
                      onClick={() => window.history.back()}
                      className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300"
                    >
                      عودة للدروس
                    </button>
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