import React, { useState } from 'react';

export default function Quiz({ questions = [], onFinish, onCancel, passThreshold = 0.8 }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  function selectOption(optIndex) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optIndex;
      return next;
    });
  }

  function submit() {
    const correct = answers.reduce((acc, ans, i) => acc + (ans === questions[i].answer ? 1 : 0), 0);
    const score = correct / questions.length;
    const passed = score >= passThreshold;
    onFinish(passed, score);
  }

  return (
    <div>
      <div className="mb-4">
        <div className="text-sm text-gray-600">Question {index + 1} / {questions.length}</div>
        <div className="font-medium text-gray-800 mt-2">{questions[index]?.q}</div>
      </div>

      <div className="space-y-3 mb-4">
        {questions[index]?.options.map((opt, i) => (
          <button key={i} onClick={() => selectOption(i)} className={`w-full text-left px-4 py-3 rounded-lg border ${answers[index] === i ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
            {opt}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button disabled={index === 0} onClick={() => setIndex((s) => s - 1)} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">Back</button>
          <button disabled={index === questions.length - 1} onClick={() => setIndex((s) => s + 1)} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">Next</button>
        </div>

        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-red-100 text-red-600">Cancel</button>
          <button onClick={submit} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Submit</button>
        </div>
      </div>
    </div>
  );
}
