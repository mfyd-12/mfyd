import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TestTypes() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-10 shadow-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">اختر نوع الاختبار</h2>
          <p className="text-gray-600 mb-8">اختر الاختبار الذي تود القيام به الآن</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2">اختبار المفردات (اختيار من متعدد)</h3>
              <p className="text-gray-700 mb-4">الاختبار الموجود مسبقاً — اختر المعنى الصحيح للكلمة</p>
              <button
                onClick={() => navigate('/vocabulary-test')}
                className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
              >
                ابدأ اختبار المفردات
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow hover:shadow-lg">
              <h3 className="text-xl font-bold mb-2">اختبار الإملاء (Dictation)</h3>
              <p className="text-gray-700 mb-4">اكتب المعنى الإنجليزي للكلمة العربية في خانة الكتابة</p>
              <button
                onClick={() => navigate('/dictation-test')}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                ابدأ اختبار الإملاء
              </button>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 underline"
            >
              العودة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
