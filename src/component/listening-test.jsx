import React, { useState, useRef } from 'react';
import { Award } from 'lucide-react';

export default function ListeningTest() {
  // expected sentence (exact or normalized comparison)
  const expected = "The sky was painted with shades of orange and pink as the sun began to set.";

  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const audioRef = useRef(null);

  const normalize = (s) => {
    if (!s) return '';
    // remove punctuation, make lowercase, collapse spaces
    return s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleCheck = () => {
    const user = normalize(answer);
    const good = normalize(expected);
    setCorrect(user === good);
    setChecked(true);
  };

  const handleReset = () => {
    setAnswer('');
    setChecked(false);
    setCorrect(false);
    if (audioRef.current) audioRef.current.pause();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">اختبار الاستماع</h2>
          <p className="text-gray-600 mb-6">استمع إلى المقطع ثم اكتب ما تسمعه بالإنجليزية في الحقل أدناه.</p>

          <div className="mb-6">
            {/* Audio player - file should be in public/text1.mp3 */}
            <audio ref={audioRef} controls className="w-full">
              <source src="/text1.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">اكتب الجملة بالإنجليزية</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={3}
              className="w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="Type what you hear here..."
            />
          </div>

          <div className="flex gap-4">
            <button onClick={handleCheck} className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition">تحقق</button>
            <button onClick={handleReset} className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">إعادة</button>
          </div>

          {checked && (
            <div className="mt-8 text-center">
              <div className={`inline-flex p-4 rounded-full mb-4 ${correct ? 'bg-green-500' : 'bg-red-500'}`}>
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{correct ? 'إجابتك صحيحة' : 'إجابتك غير صحيحة'}</h3>
              {!correct && (
                <div className="mt-4 text-left bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">الإجابة الصحيحة:</p>
                  <p className="font-medium">{expected}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
