import React, { useState, useEffect } from 'react';
import Level from './Level';
import ProgressBar from './ProgressBar';
import ListeningChallenge from './ListeningChallenge';

const STORAGE_KEY = 'learningRoadProgress';

const defaultLevels = [
  {
    id: 1,
    title: 'Level 1 - Vocabulary',
    type: 'multipleChoice',
    questions: [
      { q: 'What is the English word for "قطة"?', options: ['Dog', 'Cat', 'Bird', 'Fish'], answer: 1 },
      { q: 'Select the correct plural: "apple" -> ?', options: ['apples', 'applees', 'appli', 'appleses'], answer: 0 },
      { q: 'What is the opposite of "hot"?', options: ['Warm', 'Cold', 'Sunny', 'Bright'], answer: 1 }
    ]
  },
  {
    id: 2,
    title: 'Level 2 - Grammar',
    type: 'multipleChoice',
    questions: [
      { q: 'Choose the correct verb: "I ___ to school."', options: ['goes', 'went', 'go', 'gone'], answer: 2 },
      { q: 'Which is a adjective?', options: ['Run', 'Happy', 'Quickly', 'Under'], answer: 1 },
      { q: 'Past tense of "eat" is', options: ['eated', 'ate', 'eaten', 'eat'], answer: 1 }
    ]
  },
  {
    id: 3,
    title: 'Level 3 - Advanced Grammar',
    type: 'multipleChoice',
    questions: [
      { q: 'She ___ already ___ her homework.', options: ['have / finish', 'has / finished', 'had / finishing', 'have / finishes'], answer: 1 },
      { q: 'Pick the correct preposition: "He is good ___ math"', options: ['in', 'at', 'on', 'for'], answer: 1 },
      { q: 'Synonym of "big"', options: ['Small', 'Huge', 'Tiny', 'Narrow'], answer: 1 }
    ]
  },
  {
    id: 4,
    title: 'Level 4 - Listening Challenge',
    type: 'listening',
    // Data handled by ListeningChallenge component
  }
];

export default function Road() {
  const [levels] = useState(defaultLevels);
  const [statusList, setStatusList] = useState([]); // 'locked' | 'open' | 'complete'
  const [activeQuiz, setActiveQuiz] = useState(null); // { levelIndex, level }

  // Initialize progress from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === levels.length) {
          setStatusList(parsed);
          return;
        }
      } catch (e) {
        // fallback to init
      }
    }

    const init = levels.map((_, i) => (i === 0 ? 'open' : 'locked'));
    setStatusList(init);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
  }, [levels]);

  // Save progress to localStorage
  useEffect(() => {
    if (statusList.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statusList));
    }
  }, [statusList]);

  function startQuiz(levelIndex) {
    if (statusList[levelIndex] === 'locked') return;
    setActiveQuiz({ levelIndex, level: levels[levelIndex] });
  }

  function handleQuizFinish(levelIndex, passed) {
    setActiveQuiz(null);
    if (!passed) return;

    setStatusList((prev) => {
      const next = [...prev];
      next[levelIndex] = 'complete';
      if (levelIndex + 1 < next.length && next[levelIndex + 1] === 'locked') {
        next[levelIndex + 1] = 'open';
      }
      return next;
    });
  }

  const completedCount = statusList.filter((s) => s === 'complete').length;
  const percent = Math.round((completedCount / levels.length) * 100);

  return (
    <div className="bg-gradient-to-r from-white/10 to-white/5 p-6 rounded-2xl shadow-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Learning Progress Road</h3>
        <div className="text-sm text-blue-100">Progress: {percent}%</div>
      </div>

      <ProgressBar percent={percent} />

      <div className="mt-6 flex flex-col lg:flex-row gap-6 items-center lg:items-start">
        {levels.map((lvl, idx) => (
          <Level
            key={lvl.id}
            index={idx}
            title={lvl.title}
            status={statusList[idx]}
            onStart={() => startQuiz(idx)}
          />
        ))}
      </div>

      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h4 className="text-lg font-bold mb-2 text-gray-800">{activeQuiz.level.title}</h4>
              <p className="text-sm text-gray-600 mb-4">Answer the questions to pass and unlock the next level.</p>
              <div>
                <QuizWrapper
                  level={activeQuiz.level}
                  levelIndex={activeQuiz.levelIndex}
                  onFinish={(passed) => handleQuizFinish(activeQuiz.levelIndex, passed)}
                  onCancel={() => setActiveQuiz(null)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Quiz wrapper component
function QuizWrapper({ level, levelIndex, onFinish, onCancel }) {
  // Level 4: Listening Challenge
  if (level.type === 'listening') {
    return (
      <ListeningChallenge
        onComplete={(passed) => onFinish(passed)}
        onCancel={onCancel}
      />
    );
  }

  // Levels 1-3: Multiple Choice
  return (
    <MultipleChoiceQuiz
      questions={level.questions}
      onFinish={onFinish}
      onCancel={onCancel}
    />
  );
}

// Multiple Choice Quiz Component
function MultipleChoiceQuiz({ questions, onFinish, onCancel }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  function selectOption(optIndex) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optIndex;
      return next;
    });
  }

  function calculateResults() {
    const details = questions.map((q, i) => {
      const userIdx = answers[i];
      const userAnswer = typeof userIdx === 'number' ? q.options[userIdx] : null;
      const correctAnswer = q.options[q.answer];
      const isCorrect = userIdx === q.answer;

      return {
        question: q.q,
        userAnswer,
        correctAnswer,
        isCorrect
      };
    });

    const correct = details.filter((d) => d.isCorrect).length;
    const score = correct / questions.length;
    const passed = score >= 0.8;

    return { details, correct, total: questions.length, score, passed };
  }

  function submit() {
    const results = calculateResults();
    setResults(results);
    setShowResults(true);
  }

  function handleFinish() {
    onFinish(results.passed);
  }

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">
            {results.passed ? (
              <span className="text-green-600">🎉 أحسنت!</span>
            ) : (
              <span className="text-red-600">حاول مرة أخرى</span>
            )}
          </div>
          <div className="text-gray-600">
            لقد أجبت على {results.correct} من {results.total} أسئلة بشكل صحيح ({Math.round(results.score * 100)}%)
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">تفاصيل إجاباتك:</h4>
          {results.details.map((detail, i) => (
            <div key={i} className={`p-4 rounded-lg ${detail.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="font-medium text-gray-800">{detail.question}</div>
              <div className="mt-2 text-sm">
                <div className={`${detail.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  إجابتك: {detail.userAnswer ?? 'لم تجب'}
                </div>
                {!detail.isCorrect && (
                  <div className="text-green-600 mt-1">الإجابة الصحيحة: {detail.correctAnswer}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">إغلاق</button>
          {results.passed ? (
            <button onClick={handleFinish} className="px-4 py-2 rounded-lg bg-green-600 text-white">المستوى التالي ✨</button>
          ) : (
            <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-blue-600 text-white">حاول مرة أخرى</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="text-sm text-gray-600">Question {index + 1} / {questions.length}</div>
        <div className="font-medium text-gray-800 mt-2">{questions[index].q}</div>
      </div>

      <div className="space-y-3 mb-4">
        {questions[index].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => selectOption(i)}
            className={`text-black w-full text-left px-4 py-3 rounded-lg border ${
              answers[index] === i ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setIndex((s) => s - 1)}
            disabled={index === 0}
            className={`px-4 py-2 rounded-lg ${
              index === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            السابق
          </button>
          <button
            onClick={() => setIndex((s) => s + 1)}
            disabled={index === questions.length - 1}
            className={`px-4 py-2 rounded-lg ${
              index === questions.length - 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            التالي
          </button>
        </div>

        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
            إلغاء
          </button>
          <button onClick={submit} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            إنهاء الاختبار
          </button>
        </div>
      </div>
    </div>
  );
}
