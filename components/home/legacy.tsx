"use client";

import { motion } from "framer-motion";
import { Award, Heart, Users, Sparkles } from "lucide-react";

const milestones = [
  {
    year: "1955",
    title: "Foundation",
    description: "First heritage celebration organized",
  },
  {
    year: "1980",
    title: "Expansion",
    description: "Festival becomes annual tradition",
  },
  {
    year: "2000",
    title: "Recognition",
    description: "Awarded cultural heritage status",
  },
  {
    year: "2026",
    title: "71 Years",
    description: "Celebrating 71 Years of Culture & Community",
  },
];

const values = [
  {
    icon: Heart,
    label: "Community",
    description: "Building lasting connections",
  },
  { icon: Users, label: "Diversity", description: "Celebrating all cultures" },
  { icon: Award, label: "Excellence", description: "Quality in every detail" },
  {
    icon: Sparkles,
    label: "Innovation",
    description: "Tradition meets modernity",
  },
];

export function Legacy() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Our Legacy
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Seven decades of cultural celebration, community building, and
            heritage preservation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {milestone.year}
              </div>
              <div className="text-lg font-semibold mb-1">
                {milestone.title}
              </div>
              <div className="text-sm text-muted-foreground">
                {milestone.description}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 text-center border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
