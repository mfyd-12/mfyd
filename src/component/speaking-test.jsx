import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';

export default function SpeakingTest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userReply, setUserReply] = useState('');
  const [messages, setMessages] = useState([]);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef(null);

  // Conversation script in English
  const script = [
    {
      id: 1,
      partner: 'Hi! How are you today?',
      expectedKeywords: ['fine', 'good', 'well', 'great', 'thanks', 'thank you'],
      hint: "Reply briefly, e.g. 'I'm good, thanks.'"
    },
    {
      id: 2,
      partner: 'What are your plans for this week?',
      expectedKeywords: ['study', 'work', 'travel', 'project', 'classes', 'exam', 'meeting'],
      hint: 'Mention one activity you will do this week.'
    },
    {
      id: 3,
      partner: 'What kind of music do you like?',
      expectedKeywords: ['rock', 'pop', 'hip', 'jazz', 'classical', 'music'],
      hint: 'Name a music genre and say why you like it.'
    },
    {
      id: 4,
      partner: 'Do you prefer online learning or in-person classes? Why?',
      expectedKeywords: ['online', 'in-person', 'online classes', 'easier', 'better', 'more convenient'],
      hint: 'Give a short reason for your preference.'
    }
  ];

  useEffect(() => {
    // initialize with first partner message
    setMessages([{ from: 'partner', text: script[0].partner }]);
    inputRef.current?.focus();
  }, []);

  const evaluateReply = (reply, expectedKeywords) => {
    if (!reply || !reply.trim()) return { ok: false, score: 0, feedback: 'No reply provided.' };
    const lc = reply.toLowerCase();
    // simple keyword match
    const matched = expectedKeywords.some(k => lc.includes(k.toLowerCase()));
    if (matched) return { ok: true, score: 1, feedback: 'Good reply — it contains expected keywords.' };
    // fallback: longer reply gets partial credit
    if (reply.trim().split(/\s+/).length >= 3) return { ok: false, score: 0.5, feedback: 'Acceptable reply. Try to include more specific words.' };
    return { ok: false, score: 0, feedback: 'Reply is short or off-topic. Try to use words related to the question.' };
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    const step = script[currentStep];
    const evalRes = evaluateReply(userReply, step.expectedKeywords);

    // append user's message and feedback
    setMessages(prev => [...prev, { from: 'user', text: userReply }]);
    setResults(prev => [...prev, { step: step.id, ...evalRes }]);

    setUserReply('');

    // move to next partner message or finish
    const next = currentStep + 1;
    if (next < script.length) {
      // small delay to simulate partner reply
      setTimeout(() => {
        setMessages(prev => [...prev, { from: 'partner', text: script[next].partner }]);
        setCurrentStep(next);
        inputRef.current?.focus();
      }, 700);
    } else {
      setFinished(true);
    }
  };

  const scoreTotal = () => results.reduce((s, r) => s + (r.score || 0), 0);

  const restart = () => {
    setCurrentStep(0);
    setMessages([{ from: 'partner', text: script[0].partner }]);
    setUserReply('');
    setResults([]);
    setFinished(false);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Speaking Test</h2>
            <p className="text-gray-600">Listen to the partner and type your reply. The system will give simple feedback.</p>
          </div>
          <div>
            <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-gray-900">Back</button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'partner' ? '' : 'justify-end'}`}>
                  <div className={`${m.from === 'partner' ? 'bg-gray-100 text-gray-900' : 'bg-blue-600 text-white'} px-4 py-3 rounded-2xl max-w-[80%]`}> 
                    <div className="flex items-center gap-2">
                      {m.from === 'partner' ? <MessageCircle className="w-4 h-4 text-gray-500" /> : <CheckCircle className="w-4 h-4 text-white" />}
                      <span className="text-sm">{m.text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!finished ? (
            <form onSubmit={handleSubmit} className="p-6">
              <p className="text-sm text-gray-600 mb-3">{script[currentStep].hint}</p>
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  value={userReply}
                  onChange={(e) => setUserReply(e.target.value)}
                  placeholder="Type your reply here..."
                  className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button type="submit" className="bg-purple-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
                  Send <ArrowRight className="inline-block w-4 h-4 ml-2" />
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-500">Part {currentStep + 1} of {script.length}</div>
            </form>
          ) : (
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Test finished</h3>
              <p className="text-gray-700 mb-4">Your approximate score: <span className="font-semibold">{scoreTotal()} / {script.length}</span></p>

              <div className="mb-4">
                {results.map((r, idx) => (
                  <div key={idx} className="mb-3 p-3 rounded-xl border">
                    <div className="text-sm font-semibold">Question {r.step}</div>
                    <div className="text-sm text-gray-700">Verdict: {r.ok ? 'Good' : (r.score > 0 ? 'Acceptable' : 'Weak')}</div>
                    <div className="text-xs text-gray-500">Feedback: {r.feedback}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <button onClick={restart} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">Try again</button>
                <button onClick={() => navigate('/')} className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl">Home</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
