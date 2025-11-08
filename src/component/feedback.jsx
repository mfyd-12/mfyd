import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      role: "مهندس برمجيات",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "منصة رائعة ساعدتني في تحسين مستواي في اللغة الإنجليزية بشكل ملحوظ. الدروس منظمة وسهلة الفهم، والمعلمون محترفون جداً. أنصح الجميع بتجربتها!",
      course: "دورة المحادثة المتقدمة"
    },
    {
      id: 2,
      name: "فاطمة العلي",
      role: "طالبة جامعية",
      image: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      text: "بفضل هذه المنصة تمكنت من الحصول على درجة عالية في امتحان IELTS. المحتوى شامل والتمارين التفاعلية ساعدتني كثيراً في التحضير للامتحان.",
      course: "تحضير IELTS"
    },
    {
      id: 3,
      name: "خالد السعيد",
      role: "رجل أعمال",
      image: "https://i.pravatar.cc/150?img=33",
      rating: 5,
      text: "أفضل استثمار قمت به هذا العام! تعلمت الإنجليزية بطريقة عملية تساعدني في عملي اليومي. الدروس المخصصة للأعمال كانت مفيدة جداً.",
      course: "إنجليزية الأعمال"
    },
    {
      id: 4,
      name: "مريم حسن",
      role: "معلمة",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "منصة متميزة بكل المقاييس! التطبيق سهل الاستخدام والمحتوى غني ومتنوع. استطعت التعلم في أوقات فراغي بكل مرونة. شكراً للفريق المبدع!",
      course: "دورة المبتدئين"
    },
    {
      id: 5,
      name: "عمر الشمري",
      role: "طبيب",
      image: "https://i.pravatar.cc/150?img=15",
      rating: 5,
      text: "تجربة تعليمية رائعة! الدروس التفاعلية والاختبارات المنتظمة ساعدتني على تتبع تقدمي. أصبحت أكثر ثقة في التحدث مع المرضى الأجانب.",
      course: "الإنجليزية الطبية"
    },
    {
      id: 6,
      name: "نورة القحطاني",
      role: "مصممة جرافيك",
      image: "https://i.pravatar.cc/150?img=20",
      rating: 5,
      text: "من أفضل المنصات التي جربتها! التصميم جميل والمحتوى ممتاز. تحسنت مهاراتي في الكتابة والقراءة بشكل كبير خلال 3 أشهر فقط.",
      course: "الكتابة الإبداعية"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(activeIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              💬 آراء الطلاب
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ماذا يقول طلابنا
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            انضم لآلاف الطلاب الذين حققوا أهدافهم في تعلم اللغة الإنجليزية معنا
          </p>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-sm text-gray-600">تقييم المنصة</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
            <div className="text-sm text-gray-600">مراجعة إيجابية</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-pink-600 mb-2">98%</div>
            <div className="text-sm text-gray-600">رضا الطلاب</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
            <div className="text-3xl font-bold text-orange-600 mb-2">1M+</div>
            <div className="text-sm text-gray-600">طالب سعيد</div>
          </div>
        </div>

        {/* البطاقات */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-2xl p-8 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  index === 0 ? 'md:scale-105 border-2 border-blue-500' : ''
                }`}
              >
                {/* علامة اقتباس */}
                <div className="mb-4">
                  <Quote className="w-10 h-10 text-blue-500 opacity-20" />
                </div>

                {/* النجوم */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* النص */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* الدورة */}
                <div className="mb-6">
                  <span className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                    📚 {testimonial.course}
                  </span>
                </div>

                {/* معلومات المستخدم */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-50"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* شارة مميزة للبطاقة الأولى */}
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    ⭐ الأكثر تميزاً
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* أزرار التنقل */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prevTestimonial}
              className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* النقاط */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? 'bg-blue-600 w-8 h-3'
                      : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">هل أنت مستعد لتكون القصة التالية؟</h3>
            <p className="text-blue-100 mb-6 text-lg">ابدأ رحلتك في تعلم اللغة الإنجليزية اليوم</p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-xl">
              ابدأ التجربة المجانية الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}