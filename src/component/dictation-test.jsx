import React, { useState } from 'react';
import { Award } from 'lucide-react';

export default function DictationTest() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // List of 10 dictation items: Arabic word and correct English meaning
  const items = [
    { id: 1, ar: 'مدرسة', en: 'school' },
    { id: 2, ar: 'كتاب', en: 'book' },
    { id: 3, ar: 'قلم', en: 'pen' },
    { id: 4, ar: 'منزل', en: 'house' },
    { id: 5, ar: 'طعام', en: 'food' },
    { id: 6, ar: 'سيارة', en: 'car' },
    { id: 7, ar: 'هاتف', en: 'phone' },
    { id: 8, ar: 'نافذة', en: 'window' },
    { id: 9, ar: 'باب', en: 'door' },
    { id: 10, ar: 'حديقة', en: 'garden' }
  ];

  const handleChange = (value) => {
    setAnswers({ ...answers, [items[current].id]: value });
  };

  const handleNext = () => {
    if (current < items.length - 1) {
      setCurrent(current + 1);
    } else {
      // finish
      calculateScore();
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const calculateScore = () => {
    let correct = 0;
    items.forEach((it) => {
      const user = (answers[it.id] || '').trim().toLowerCase();
      const good = (it.en || '').trim().toLowerCase();
      if (user === good && user !== '') correct++;
    });
    setScore(correct);
    return correct;
  };

  const reset = () => {
    setCurrent(0);
    setAnswers({});
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {!showResult ? (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">اختبار الإملاء</h3>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full font-semibold">
                  السؤال {current + 1} من {items.length}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold mb-2">{items[current].ar}</h2>
                <p className="text-gray-600">اكتب المعنى الصحيح باللغة الإنجليزية</p>
              </div>

              <div className="mb-6">
                <input
                  value={answers[items[current].id] || ''}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Type the English meaning here"
                  className="w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div className="flex gap-4">
                {current > 0 && (
                  <button onClick={handlePrevious} className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">السابق ⬅️</button>
                )}
                <button onClick={handleNext} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">{current === items.length - 1 ? 'إنهاء الاختبار' : 'التالي ➡️'}</button>
              </div>

              <div className="mt-6 text-sm text-gray-500">نصيحة: اكتب المعنى بكلمة واحدة إن أمكن (مثال: "book").</div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fadeIn">
            <div className={`inline-flex p-6 rounded-full mb-6 ${score === items.length ? 'bg-green-500' : score >= items.length * 0.7 ? 'bg-blue-500' : score >= items.length * 0.5 ? 'bg-yellow-500' : 'bg-red-500'}`}>
              <Award className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-4xl font-bold mb-4">نتيجتك: {score} / {items.length}</h2>
            <p className="text-gray-600 mb-6">{score === items.length ? 'ممتاز! إجابات صحيحة كلها' : `أجبت بشكل صحيح على ${score} سؤال`}</p>

            <div className="flex justify-center gap-4">
              <button onClick={reset} className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700">أعد الاختبار</button>
              <button onClick={() => window.history.back()} className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700">عودة</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
