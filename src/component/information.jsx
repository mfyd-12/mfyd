import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Headphones, MessageCircle, Video, PenTool, Brain, Target, Zap, CheckCircle, TrendingUp, Award, ArrowRight } from 'lucide-react';

export default function ImproveEnglishSection() {
  const [activeTab, setActiveTab] = useState('skills');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const skills = [
    {
      id: 'listening',
      icon: Headphones,
      title: 'الاستماع',
      color: 'from-blue-500 to-cyan-500',
      description: 'طور مهارات الاستماع والفهم',
      tips: [
        'استمع للبودكاست الإنجليزي 15 دقيقة يومياً',
        'شاهد الأفلام والمسلسلات بدون ترجمة',
        'استمع للأخبار الإنجليزية أثناء القيادة',
        'استخدم تطبيقات الاستماع التفاعلية'
      ],
      resources: ['BBC Learning English', 'TED Talks', 'English Podcasts']
    },
    {
      id: 'speaking',
      icon: MessageCircle,
      title: 'المحادثة',
      color: 'from-purple-500 to-pink-500',
      description: 'تحدث بطلاقة وثقة',
      tips: [
        'تحدث مع نفسك بالإنجليزية لمدة 10 دقائق يومياً',
        'انضم لمجموعات المحادثة الإنجليزية',
        'سجل صوتك واستمع لنطقك',
        'مارس المحادثة مع متحدثين أصليين'
      ],
      resources: ['Language Exchange Apps', 'Speaking Clubs', 'Online Tutors']
    },
    {
      id: 'reading',
      icon: BookOpen,
      title: 'القراءة',
      color: 'from-green-500 to-emerald-500',
      description: 'اقرأ وافهم بسهولة',
      tips: [
        'اقرأ 20 صفحة يومياً من كتاب إنجليزي',
        'ابدأ بكتب مبسطة ثم تدرج للمستويات الأعلى',
        'اقرأ المقالات والأخبار الإنجليزية',
        'استخدم القاموس لتعلم كلمات جديدة'
      ],
      resources: ['Graded Readers', 'News Articles', 'E-books']
    },
    {
      id: 'writing',
      icon: PenTool,
      title: 'الكتابة',
      color: 'from-orange-500 to-red-500',
      description: 'اكتب بوضوح واحترافية',
      tips: [
        'اكتب يومياتك بالإنجليزية',
        'شارك في المنتديات الإنجليزية',
        'تدرب على كتابة الإيميلات الرسمية',
        'استخدم تطبيقات التصحيح اللغوي'
      ],
      resources: ['Grammarly', 'Writing Forums', 'Email Templates']
    }
  ];

  const methods = [
    {
      id: 1,
      icon: Target,
      title: 'حدد هدفك',
      description: 'ضع هدفاً واضحاً ومحدداً لتعلم اللغة',
      details: 'حدد لماذا تريد تعلم الإنجليزية (عمل، سفر، دراسة) وضع جدولاً زمنياً واقعياً لتحقيق هدفك.',
      timeframe: '1-2 أسبوع'
    },
    {
      id: 2,
      icon: Brain,
      title: 'التعلم اليومي',
      description: 'خصص وقتاً ثابتاً يومياً للتعلم',
      details: 'الاستمرارية أهم من الكمية. 30 دقيقة يومياً أفضل من 3 ساعات مرة واحدة أسبوعياً.',
      timeframe: 'يومي'
    },
    {
      id: 3,
      icon: Video,
      title: 'الانغماس اللغوي',
      description: 'أحط نفسك باللغة الإنجليزية',
      details: 'غير لغة هاتفك، استمع للموسيقى الإنجليزية، شاهد المحتوى الإنجليزي، اجعل الإنجليزية جزءاً من حياتك اليومية.',
      timeframe: 'مستمر'
    },
    {
      id: 4,
      icon: Zap,
      title: 'التطبيق العملي',
      description: 'استخدم ما تعلمته في مواقف حقيقية',
      details: 'لا تكتفي بالدراسة النظرية. تحدث، اكتب، استخدم اللغة في حياتك اليومية للتمكن الفعلي.',
      timeframe: 'يومي'
    },
    {
      id: 5,
      icon: TrendingUp,
      title: 'تتبع التقدم',
      description: 'راقب تطورك وحافظ على حماسك',
      details: 'سجل إنجازاتك، احتفل بالنجاحات الصغيرة، واستخدم التطبيقات لتتبع تقدمك وتحفيزك.',
      timeframe: 'أسبوعي'
    },
    {
      id: 6,
      icon: MessageCircle,
      title: 'الممارسة الاجتماعية',
      description: 'تواصل مع متحدثين آخرين',
      details: 'انضم لمجموعات، ابحث عن شريك لتبادل اللغة، شارك في الفعاليات الإنجليزية.',
      timeframe: '2-3 مرات أسبوعياً'
    }
  ];

  const quickTips = [
    'تعلم 5 كلمات جديدة يومياً',
    'شاهد فيديو قصير بالإنجليزية',
    'تدرب على النطق 10 دقائق',
    'اقرأ مقال قصير',
    'اكتب 3 جمل عن يومك',
    'استمع لأغنية وحاول فهم كلماتها'
  ];

  const questions = [
    {
      id: 1,
      question: 'What is your name?',
      questionAr: 'ما هو اسمك؟',
      options: [
        { id: 'a', text: 'My name is Ahmed', correct: true },
        { id: 'b', text: 'I have 25 years', correct: false },
        { id: 'c', text: 'I am from home', correct: false },
        { id: 'd', text: 'Yes, I do', correct: false }
      ],
      level: 'beginner'
    },
    {
      id: 2,
      question: 'Choose the correct verb: She _____ to school every day.',
      questionAr: 'اختر الفعل الصحيح: هي _____ إلى المدرسة كل يوم.',
      options: [
        { id: 'a', text: 'go', correct: false },
        { id: 'b', text: 'goes', correct: true },
        { id: 'c', text: 'going', correct: false },
        { id: 'd', text: 'gone', correct: false }
      ],
      level: 'beginner'
    },
    {
      id: 3,
      question: 'What is the plural of "child"?',
      questionAr: 'ما هو جمع كلمة "طفل"؟',
      options: [
        { id: 'a', text: 'childs', correct: false },
        { id: 'b', text: 'childes', correct: false },
        { id: 'c', text: 'children', correct: true },
        { id: 'd', text: 'child', correct: false }
      ],
      level: 'beginner'
    },
    {
      id: 4,
      question: 'I _____ studying English for 3 years.',
      questionAr: 'أنا _____ الإنجليزية منذ 3 سنوات.',
      options: [
        { id: 'a', text: 'am', correct: false },
        { id: 'b', text: 'have been', correct: true },
        { id: 'c', text: 'was', correct: false },
        { id: 'd', text: 'will be', correct: false }
      ],
      level: 'intermediate'
    },
    {
      id: 5,
      question: 'Choose the correct preposition: I am interested _____ learning languages.',
      questionAr: 'اختر حرف الجر الصحيح: أنا مهتم _____ تعلم اللغات.',
      options: [
        { id: 'a', text: 'in', correct: true },
        { id: 'b', text: 'on', correct: false },
        { id: 'c', text: 'at', correct: false },
        { id: 'd', text: 'for', correct: false }
      ],
      level: 'intermediate'
    },
    {
      id: 6,
      question: 'If I _____ rich, I would travel the world.',
      questionAr: 'لو كنت _____ غنياً، لسافرت حول العالم.',
      options: [
        { id: 'a', text: 'am', correct: false },
        { id: 'b', text: 'was', correct: false },
        { id: 'c', text: 'were', correct: true },
        { id: 'd', text: 'will be', correct: false }
      ],
      level: 'intermediate'
    },
    {
      id: 7,
      question: 'The project _____ by the team last month.',
      questionAr: 'المشروع _____ من قبل الفريق الشهر الماضي.',
      options: [
        { id: 'a', text: 'completed', correct: false },
        { id: 'b', text: 'was completed', correct: true },
        { id: 'c', text: 'has completed', correct: false },
        { id: 'd', text: 'completing', correct: false }
      ],
      level: 'intermediate'
    },
    {
      id: 8,
      question: 'Which sentence is grammatically correct?',
      questionAr: 'أي جملة صحيحة نحوياً؟',
      options: [
        { id: 'a', text: 'He don\'t like coffee', correct: false },
        { id: 'b', text: 'He doesn\'t likes coffee', correct: false },
        { id: 'c', text: 'He doesn\'t like coffee', correct: true },
        { id: 'd', text: 'He not like coffee', correct: false }
      ],
      level: 'beginner'
    },
    {
      id: 9,
      question: 'I wish I _____ speak English fluently.',
      questionAr: 'أتمنى لو كنت _____ أتحدث الإنجليزية بطلاقة.',
      options: [
        { id: 'a', text: 'can', correct: false },
        { id: 'b', text: 'could', correct: true },
        { id: 'c', text: 'will', correct: false },
        { id: 'd', text: 'would', correct: false }
      ],
      level: 'advanced'
    },
    {
      id: 10,
      question: 'Despite _____ hard, he failed the exam.',
      questionAr: 'على الرغم من _____ بجد، فشل في الامتحان.',
      options: [
        { id: 'a', text: 'study', correct: false },
        { id: 'b', text: 'studied', correct: false },
        { id: 'c', text: 'studying', correct: true },
        { id: 'd', text: 'to study', correct: false }
      ],
      level: 'advanced'
    }
  ];

  const handleAnswer = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      const selectedOption = answers[q.id];
      const correctOption = q.options.find(opt => opt.correct);
      if (selectedOption === correctOption.id) {
        correct++;
      }
    });
    return correct;
  };

  const getLevel = (score) => {
    if (score <= 3) return { level: 'مبتدئ', color: 'from-red-500 to-orange-500', message: 'أنت في بداية الطريق! ننصحك بالبدء بدورة المبتدئين الأساسية.' };
    if (score <= 6) return { level: 'متوسط', color: 'from-yellow-500 to-orange-500', message: 'لديك أساسيات جيدة! حان الوقت لتطوير مهاراتك أكثر.' };
    if (score <= 8) return { level: 'جيد', color: 'from-blue-500 to-purple-500', message: 'مستوى ممتاز! أنت على الطريق الصحيح للإتقان.' };
    return { level: 'متقدم', color: 'from-green-500 to-emerald-500', message: 'رائع! لديك مستوى متقدم في اللغة الإنجليزية!' };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setShowQuiz(false);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold">
              🚀 دليل التحسين الشامل
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            طرق فعالة لتحسين لغتك الإنجليزية
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اكتشف استراتيجيات مجربة وطرق عملية تساعدك على إتقان اللغة الإنجليزية بشكل أسرع وأكثر فعالية
          </p>
        </div>

        {/* التبويبات */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'skills'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
            }`}
          >
            المهارات الأربع
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'methods'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
            }`}
          >
            طرق التعلم
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'tips'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
            }`}
          >
            نصائح سريعة
          </button>
        </div>

        {/* محتوى المهارات الأربع */}
        {activeTab === 'skills' && (
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.id}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${skill.color} mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{skill.title}</h3>
                  <p className="text-gray-600 mb-6">{skill.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {skill.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-500 mb-2">مصادر مقترحة:</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.resources.map((resource, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                  {(skill.id === 'reading' || skill.id === 'writing' || skill.id === 'listening' || skill.id === 'speaking') && (
                    <div className="mt-6 flex gap-4">
                      {skill.id === 'reading' && (
                        <button
                          onClick={() => navigate('/reading-test')}
                          className="bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300"
                        >
                          اختبارات القراءة
                        </button>
                      )}
                      {skill.id === 'listening' && (
                        <button
                          onClick={() => navigate('/listening-test')}
                          className="bg-teal-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-teal-700 transition-all duration-300"
                        >
                          اختبر استماعك
                        </button>
                      )}
                      {skill.id === 'writing' && (
                        <button
                          onClick={() => navigate('/test-types')}
                          className="bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-700 transition-all duration-300"
                        >
                          اختبر نفسك
                        </button>
                      )}
                    {skill.id === 'speaking' && (
                      <button
                        onClick={() => navigate('/speaking-test')}
                        className="bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300"
                      >
                        Speaking Test
                      </button>
                    )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* محتوى طرق التعلم */}
        {activeTab === 'methods' && (
          <div className="grid md:grid-cols-3 gap-6">
            {methods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(selectedMethod === method.id ? null : method.id)}
                  className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedMethod === method.id
                      ? 'shadow-2xl scale-105 border-2 border-purple-500'
                      : 'shadow-lg hover:shadow-xl hover:scale-102'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{method.title}</h3>
                      <p className="text-sm text-purple-600 font-semibold">{method.timeframe}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  
                  {selectedMethod === method.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                      <p className="text-sm text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-xl">
                        {method.details}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* محتوى النصائح السريعة */}
        {activeTab === 'tips' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">نصائح يومية سريعة</h3>
                <p className="text-gray-600">اختر نصيحة واحدة كل يوم وطبقها</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {quickTips.map((tip, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-800 font-medium pt-2">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">💡 نصيحة ذهبية</h4>
                <p className="text-gray-700 leading-relaxed">
                  الاستمرارية هي المفتاح! 15 دقيقة يومياً أفضل بكثير من ساعتين مرة واحدة أسبوعياً. 
                  اجعل تعلم الإنجليزية عادة يومية مثل تنظيف أسنانك، وستلاحظ تحسناً ملحوظاً في أقل من شهر.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">جاهز للبدء؟</h3>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                انضم لأكثر من مليون متعلم وابدأ رحلتك نحو إتقان اللغة الإنجليزية اليوم
              </p>
              <button 
                onClick={() => setShowQuiz(true)}
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                ابدأ الاختبار
              </button>
            </div>
          </div>
        </div>

        {/* قسم الاختبار */}
        {showQuiz && !showResult && (
          <div className="mt-16 animate-fadeIn">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">اختبار تحديد المستوى</h3>
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full font-semibold">
                    السؤال {currentQuestion + 1} من {questions.length}
                  </span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* السؤال */}
              <div className="p-8">
                <div className="mb-8">
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    {questions[currentQuestion].question}
                  </p>
                  <p className="text-lg text-gray-600">
                    {questions[currentQuestion].questionAr}
                  </p>
                </div>

                {/* الخيارات */}
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
                      className={`w-full text-right p-5 rounded-xl border-2 transition-all duration-300 ${
                        answers[questions[currentQuestion].id] === option.id
                          ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          answers[questions[currentQuestion].id] === option.id
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300'
                        }`}>
                          {answers[questions[currentQuestion].id] === option.id && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <span className="text-lg font-medium text-gray-800">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* أزرار التنقل */}
                <div className="flex gap-4 mt-8">
                                   {currentQuestion > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                    >
                      ⬅️ السابق
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                  >
                    {currentQuestion === questions.length - 1 ? 'إنهاء الاختبار' : 'التالي ➡️'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* عرض النتيجة */}
        {showResult && (
          <div className="mt-16 animate-fadeIn">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 text-center">
              {(() => {
                const score = calculateScore();
                const result = getLevel(score);
                return (
                  <>
                    <div className={`inline-flex p-6 rounded-full bg-gradient-to-r ${result.color} mb-6`}>
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      نتيجتك: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">{result.level}</span>
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">{result.message}</p>

                    <div className="text-2xl font-semibold mb-4">
                      🎯 مجموعك: {score} / {questions.length}
                    </div>

                    <button
                      onClick={resetQuiz}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                    >
                      أعد الاختبار 🔁
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
