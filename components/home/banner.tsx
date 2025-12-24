"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Banner() {
  return (
    <section className="py-0 md:py-1 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full mx-auto"
        >
          {/* Outer glow container */}
          <div className="relative rounded-xl md:rounded-2xl">
            {/* Animated pulsing glow layer 1 - Green - Reduced on mobile */}
            <div className="hidden md:block absolute -inset-2 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 rounded-xl md:rounded-2xl blur-xl opacity-60 animate-pulse"></div>

            {/* Animated pulsing glow layer 2 - Green - Reduced on mobile */}
            <div
              className="hidden md:block absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-xl md:rounded-2xl blur-md opacity-80"
              style={{
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            ></div>

            {/* Main border and image container */}
            <div className="relative bg-gradient-to-br from-green-700 to-emerald-600 rounded-xl md:rounded-2xl p-[2px] md:p-[3px] shadow-2xl">
              <div className="relative w-full h-auto overflow-hidden rounded-lg md:rounded-xl bg-white">
                <Image
                  src="/assets/banner/banner.jpg"
                  alt="Maghey Sankranti Mela Banner"
                  width={1600}
                  height={677}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  priority={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                />

                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />

                {/* CTA Button - Bottom Right - Smaller on mobile */}
                <div className="absolute bottom-2 right-2 md:bottom-6 md:right-6">
                  <Link href="/events">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-3 py-2 md:px-8 md:py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1 md:gap-2"
                    >
                      {/* Button glow effect - Reduced on mobile */}
                      <span className="hidden md:block absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></span>

                      <span className="relative text-xs md:text-base">
                        View Events
                      </span>
                      <ArrowRight className="relative w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
