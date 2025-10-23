"use client";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Vector from "@/assets/img/vector.png";

const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="mx-auto max-w-sm px-4 py-12 font-sans antialiased md:max-w-3xl lg:max-w-4xl md:px-8 lg:px-12">
      <div className="flex flex-col items-center">
        <motion.div
          key={active}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-center bg-[#2a3f5b] p-8 rounded-2xl shadow-lg max-w-2xl w-full"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            {testimonials[active].name}
          </h3>
          <p className="text-sm text-[#48b06c] font-medium mb-4">
            {testimonials[active].designation}
          </p>
          <motion.p className="text-lg text-gray-200">
            {testimonials[active].quote.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
        <div className="flex gap-4 pt-8 justify-center">
          <button
            onClick={handlePrev}
            className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-[#48b06c] hover:bg-[#3a8f56] transition-colors duration-300"
          >
            <FaArrowLeft className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:rotate-12" />
          </button>
          <button
            onClick={handleNext}
            className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-[#48b06c] hover:bg-[#3a8f56] transition-colors duration-300"
          >
            <FaArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:-rotate-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export function Staffsection() {
  const testimonials = [
    {
      quote:
        "With years of academic and industry experience, Mr. R. Nithya Peramkumar brings dedication and innovation to our institution.",
      name: "Mr. R. Nithya Peramkumar",
      designation: "MCA",
    },
    {
      quote:
        "Ms. R. Ezhilpriya is known for her strong grasp of electrical systems and her passion for student development.",
      name: "Ms. R. Ezhilpriya",
      designation: "B.E (EEE)",
    },
    {
      quote:
        "A committed academician, Mr. M. Muththusami’s insights in commerce elevate our business education offerings.",
      name: "Mr. M. Muththusami",
      designation: "M.Com",
    },
  ];

  return (
    <section className="relative py-16 px-4 bg-[#23334a] overflow-hidden" id="ourstaff">
      <div className="max-w-3xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#05df72] mb-4">
          Our Staff
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto text-base md:text-lg">
          Meet our passionate team of educators and administrators who are
          dedicated to delivering excellence and supporting student success.
        </p>
      </div>
      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      <img
        src={Vector}
        alt="Decorative"
        className="absolute bottom-0 left-0 h-72 md:h-96 opacity-50 pointer-events-none"
      />
    </section>
  );
}