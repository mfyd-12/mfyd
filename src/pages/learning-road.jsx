import React from 'react';
import Road from '../component/learning-road/Road';
import { ArrowRight } from 'lucide-react';

export default function LearningRoadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      {/* رأس الصفحة */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">مسار تعلم اللغة الإنجليزية</h1>
          <a
            href="/"
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            <span>العودة للرئيسية</span>
          </a>
        </div>
        <p className="mt-2 text-blue-100">اختبر مستواك وتقدم خطوة بخطوة</p>
      </div>

      {/* مكون المسار التعليمي */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Road />
      </div>

      {/* خلفية متحركة */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}