"use client";

import { motion } from "framer-motion";

const legacyMilestones = [
  {
    year: "1954",
    title: "Foundation",
    description: "Birth of Maghey Mela tradition in West Sikkim",
    image: "/legacy-1954.jpg",
  },
  {
    year: "1980s",
    title: "Cultural Revival",
    description: "Strengthening of traditional arts and crafts",
    image: "/legacy-1980s.jpg",
  },
  {
    year: "2000s",
    title: "Modern Era",
    description: "Integration of contemporary elements with tradition",
    image: "/legacy-2000s.jpg",
  },
  {
    year: "2025",
    title: "71 Years",
    description: "Celebrating 71 Years of Culture & Community",
    image: "/legacy-2025.jpg",
  },
];

export function OurLegacy() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-amber-900">
            Our Legacy
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Seven decades of preserving and celebrating the rich cultural
            heritage of West Sikkim through the annual Maghey Mela festival
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-300 hidden md:block"></div>

          <div className="space-y-12">
            {legacyMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:gap-12 gap-6`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div
                    className={`${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div className="inline-block bg-amber-200 text-amber-900 px-6 py-2 rounded-full font-bold text-lg mb-4">
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-bold text-amber-900 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-amber-700 text-lg">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:block">
                  <div className="w-6 h-6 bg-amber-600 rounded-full border-4 border-amber-200 relative z-10"></div>
                </div>

                <div className="flex-1">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-amber-100 border-4 border-amber-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-amber-600 font-semibold text-lg">
                        {milestone.year} Heritage
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-white rounded-xl p-6 border border-amber-200">
            <h4 className="text-3xl font-bold text-amber-700 mb-2">71</h4>
            <p className="text-amber-600">Years of Tradition</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-amber-200">
            <h4 className="text-3xl font-bold text-amber-700 mb-2">1000+</h4>
            <p className="text-amber-600">Cultural Programs</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-amber-200">
            <h4 className="text-3xl font-bold text-amber-700 mb-2">50K+</h4>
            <p className="text-amber-600">Lives Touched</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
