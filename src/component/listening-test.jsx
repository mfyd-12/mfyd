import React, { useState, useRef } from 'react';
import { Award } from 'lucide-react';

export default function ListeningTest() {
  // expected sentence (exact or normalized comparison)
  const expected = "The sky was painted with shades of orange and pink as the sun began to set.";

  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const audioRef = useRef(null);
  const [feedback, setFeedback] = useState('');

  const normalize = (s) => {
    if (!s) return '';
    // remove punctuation, make lowercase, collapse spaces
    return s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // simple Levenshtein distance
  const levenshtein = (a, b) => {
    const m = a.length;
    const n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return dp[m][n];
  };

  const handleCheck = () => {
    const user = normalize(answer);
    const good = normalize(expected);
    if (!user) {
      setFeedback('الرجاء كتابة ما سمعته قبل التحقق.');
      return;
    }

    if (user === good) {
      setCorrect(true);
      setFeedback('Exact match ✅');
    } else {
      const dist = levenshtein(user, good);
      const maxLen = Math.max(user.length, good.length);
      const similarity = 1 - dist / Math.max(1, maxLen);
      // accept if similarity >= 0.80 (allow small typos)
      if (similarity >= 0.8) {
        setCorrect(true);
        setFeedback(`Close match (similarity ${(similarity * 100).toFixed(0)}%) — accepted 👍`);
      } else {
        setCorrect(false);
        setFeedback(`Not close enough (similarity ${(similarity * 100).toFixed(0)}%).`);
      }
    }
    setChecked(true);
  };

  const handleReset = () => {
    setAnswer('');
    setChecked(false);
    setCorrect(false);
    setFeedback('');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
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
            <div className="mt-3 flex gap-3">
              <button onClick={handleReplay} className="bg-teal-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-teal-600 transition">Play again ▶️</button>
              <button onClick={() => { if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; } }} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-300 transition">Stop ⏹</button>
            </div>
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
          {/* feedback area */}
          {feedback && (
            <div className="mt-4 text-sm text-gray-600">{feedback}</div>
          )}

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
