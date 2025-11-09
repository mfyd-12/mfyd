import React, { useState, useEffect } from 'react';
import { BookOpen, Globe, Award, Play } from 'lucide-react';

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['بطلاقة', 'بثقة', 'باحترافية', 'بسهولة'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* النص */}
          <div className="text-white space-y-8">
            <div className="inline-block">
              <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-black">
                🎓 منصة التعليم رقم 1 في العالم العربي
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              تعلم الإنجليزية{' '}
              <span className="text-yellow-300 inline-block min-w-[200px] transition-all duration-500">
                {words[currentWord]}
              </span>
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed">
              انضم لأكثر من مليون متعلم وابدأ رحلتك لإتقان اللغة الإنجليزية مع دروس تفاعلية ومعلمين محترفين
            </p>

            {/* الأزرار */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="/learning-road"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block">
                ابدأ التعلم مجاناً
              </a>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2">
                <Play className="w-5 h-5" />
                شاهد الفيديو
              </button>
            </div>

            {/* الإحصائيات */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">+1M</div>
                <div className="text-sm text-blue-100 mt-1">طالب نشط</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm text-blue-100 mt-1">درس تفاعلي</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">98%</div>
                <div className="text-sm text-blue-100 mt-1">رضا الطلاب</div>
              </div>
            </div>
          </div>

          {/* البطاقة التفاعلية */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">ابدأ تجربتك المجانية</h3>
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl flex items-start gap-3 hover:shadow-md transition-shadow">
                    <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-800">دروس تفاعلية</h4>
                      <p className="text-sm text-gray-600">تعلم من خلال الممارسة والتطبيق العملي</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl flex items-start gap-3 hover:shadow-md transition-shadow">
                    <Award className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-800">شهادات معتمدة</h4>
                      <p className="text-sm text-gray-600">احصل على شهادة معترف بها عالمياً</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-4 rounded-xl flex items-start gap-3 hover:shadow-md transition-shadow">
                    <Play className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-800">تعلم بالفيديو</h4>
                      <p className="text-sm text-gray-600">محتوى مرئي عالي الجودة من خبراء</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  ابدأ الآن - مجاناً
                </button>

                <p className="text-center text-sm text-gray-500">
                  لا حاجة لبطاقة ائتمان • إلغاء في أي وقت
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* موجة في الأسفل */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
}

// End of src/component/hero.jsx
