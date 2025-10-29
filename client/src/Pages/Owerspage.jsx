import React from "react";
import { Users, Award, AlertCircle } from "lucide-react";
import CountUp from "react-countup";

const counterFeatures = [
  {
    icon: <Users size={36} />,
    number: 4000,
    title: "Students Enrolled",
    prefix: "+",
  },
  {
    icon: <Award size={36} />,
    number: 3500,
    title: "Graduated",
    prefix: "+",
  },
];

const founders = [
  {
    title: "Meet Our Founder",
    subtitle: "M Natarajan, M.A., CAIIB.",
    description:
      "With over 30 years of administrative experience and 15+ years of academic experience, Mr. M Natarajan envisioned an institution that provides accessible and flexible education to underserved learners. His passion for community upliftment and student success has been the driving force behind Pravishraj Memorial Academy Trust's continued growth and credibility.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    reverse: false,
  },
  {
    title: "Meet Our Co-Founder",
    subtitle: "A. Thiyagarajan, MBA (HR)",
    description:
      "A passionate educator and academic coordinator with over 10 years of experience in distance education management. He plays a key role in academic delivery and student support services.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    reverse: true,
  },
];

const AdmissionSection = () => {
  return (
    <div className="max-w-7xl mx-auto mb-20 px-4">
      {/* ---- Number Counter Cards ---- */}
      <div className="mx-auto max-w-6xl rounded-xl shadow-lg overflow-hidden border border-gray-200">
  {/* Number Counters Section */}
  <div className="flex flex-col md:flex-row justify-center flex-wrap bg-gradient-to-r from-[#e0e7ff] via-[#f5f5f5] to-[#e0e7ff] py-4 md:py-6 gap-4">
    {counterFeatures.map((feature, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center text-center flex-1 min-w-[150px] p-6 transform transition-all duration-500 hover:scale-105"
      >
        {/* Icon */}
        <div className="bg-white shadow-md rounded-full p-4 mb-3 border border-gray-200">
          {feature.icon &&
            React.cloneElement(feature.icon, {
              className: "text-blue-900",
              size: 36,
            })}
        </div>

        {/* Number */}
        {feature.number && (
          <h3 className="font-extrabold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] mb-1 drop-shadow-md">
            <CountUp
              end={feature.number}
              duration={2.5}
              enableScrollSpy={true}
              suffix={feature.prefix}
            />
          </h3>
        )}

        {/* Title */}
        <p className="text-gray-700 font-medium text-lg tracking-wide">
          {feature.title}
        </p>
      </div>
    ))}
  </div>

  {/* Marquee Bar */}
  <div className="bg-[#234159] text-white py-2 overflow-hidden border-t border-gray-300">
    <div className="animate-marquee whitespace-nowrap flex items-center justify-center">
      <AlertCircle size={20} className="text-yellow-400 mr-2" />
      <span className="text-white font-semibold">
        Working across Pondicherry and Tamilnadu in private and government jobs
      </span>
    </div>
  </div>
</div>


      {/* ---- Founder & Co-Founder Sections ---- */}
      <div className="space-y-16 mt-10">
        {founders.map((person, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 ${person.reverse ? "md:flex-row-reverse" : ""
              }`}
          >
            {/* Image */}
            <div className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src={person.image}
                alt={person.title}
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="md:w-1/2 w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-[#234159] mb-2">
                {person.title}
              </h2>
              <p className="text-green-600 font-semibold mb-4">
                {person.subtitle}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {person.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionSection;
