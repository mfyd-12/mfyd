import React from "react";
import { BellPlus, Mail, Code2 } from "lucide-react";

const testimonies = [
  {
    id: 1,
    platform: "Hostinger Horizons",
    icon: <BellPlus/>,
    iconBg: "bg-purple-500",
    message:
      "هل تفكر ببدء أو تطوير موقع إلكتروني؟ أو انضمامك مع Hostinger Horizons، ما عليك سوى تجربة الذكاء الاصطناعي لتوفير وقتك ومجهودك.",
    tags: ["استضافة مواقع", "ذكاء اصطناعي", "سهولة الإعداد"],
    author: {
      name: "Albert Bermejo",
      role: "مطور مستقل",
      image: "https://i.pravatar.cc/100?img=3",
    },
  },
  {
    id: 2,
    platform: "WordPress",
    icon: <Code2 className="w-5 h-5 text-white" />,
    iconBg: "bg-indigo-700",
    message:
      "أنصح الجميع بالانتقال إلى Hostinger، كل شيء أسهل بكثير من المتوقع وميزات عديدة بأسعار ممتازة.",
    tags: ["استضافة", "البريد الإلكتروني", "WordPress"],
    author: {
      name: "Anna Franques",
      role: "مصممة ومطورة ويب",
      image: "https://i.pravatar.cc/100?img=6",
    },
  },
  {
    id: 3,
    platform: "Hostinger Website Builder",
    icon: <Mail className="w-5 h-5 text-white" />,
    iconBg: "bg-lime-500",
    message:
      "منشئ المواقع بالذكاء الاصطناعي من Hostinger اختصر عليّ الكثير من العمل اليدوي، أنشأت موقعي بسرعة وعدلت تفاصيل بسيطة فقط.",
    tags: ["منشئ مواقع إلكترونية", "دومينات", "البريد الإلكتروني"],
    author: {
      name: "Jarrott Brown",
      role: "صاحب شركة",
      image: "https://i.pravatar.cc/100?img=12",
    },
  },
];

function Testimonials() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        آراء مستخدمي <span className="text-purple-600">Hostinger</span>
      </h1>

      {/* ✅ حاوية الكروت مع تمرير أفقي */}
      <div
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth p-4 w-full max-w-6xl"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonies.map((item) => (
          <div
            key={item.id}
            className="min-w-[350px] sm:min-w-[400px] bg-white border border-gray-200 shadow-sm rounded-2xl p-6 relative hover:shadow-lg transition-all duration-300"
          >
            {/* الأيقونة */}
            <div
              className={`absolute top-4 right-4 p-2 rounded-xl ${item.iconBg}`}
            >
              {item.icon}
            </div>

            {/* النص */}
            <p className="text-gray-700 mt-6 mb-4 leading-relaxed text-[15px]">
              {item.message}
            </p>

            {/* الوسوم */}
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* المؤلف */}
            <div className="flex items-center gap-3 mt-auto border-t pt-4">
              <img
                src={item.author.image}
                alt={item.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-right">
                <p className="text-gray-800 font-semibold text-sm">
                  {item.author.name}
                </p>
                <p className="text-gray-500 text-xs">{item.author.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
