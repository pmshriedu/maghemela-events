"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    title: "Cultural Arts",
    description: "Traditional dance, music, and performances celebrating",
    image: "/assets/Festival Highlights/cultural.jpg",
  },
  {
    title: "Sports & Games",
    description:
      "Traditional sports competitions and interactive games for all ages",
    image: "/assets/Festival Highlights/sports.jpg",
  },
  {
    title: "Culinary Journey",
    description:
      "Authentic traditional cuisine and street food from master chefs",
    image: "/assets/Festival Highlights/culinary.jpg",
  },
  {
    title: "Exhibitions",
    description:
      "Historical artifacts, art installations, and cultural displays",
    image: "/assets/Festival Highlights/exibition.jpg",
  },
];

export function Highlights() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-amber-900">
            Festival Highlights
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto text-balance leading-relaxed">
            Discover the diverse experiences that make our festival
            unforgettable
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => {
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-amber-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] bg-amber-100 overflow-hidden">
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-amber-900">
                      {highlight.title}
                    </h3>
                    <p className="text-amber-700 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
