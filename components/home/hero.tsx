"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavigationBlocker } from "../ui/navigation-blocker";

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "default" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<"default" | "outline", string> = {
    default: "bg-amber-500 text-black hover:bg-amber-600",
    outline:
      "border-2 border-white/30 bg-white/10 text-white hover:bg-white/20",
  };
  const sizes: Record<"default" | "lg", string> = {
    default: "h-10 px-4 py-2",
    lg: "h-11 px-6 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Confetti component
const Confetti = () => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const colors = [
    "#fbbf24",
    "#f59e0b",
    "#ec4899",
    "#8b5cf6",
    "#3b82f6",
    "#10b981",
    "#ef4444",
    "#f97316",
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
          }}
          initial={{
            y: -10,
            rotate: 0,
            opacity: 0.9,
          }}
          animate={{
            y: dimensions.height + 10,
            rotate: 360,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [
    "/assets/herosection/hero.mp4",
    "/assets/herosection/hero2.mp4",
    "/assets/herosection/drone4.mp4",
    "/assets/herosection/drone7.mp4",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video Slideshow */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ scale }}>
        {videos.map((videoSrc, index) => (
          <motion.video
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: index === 0 ? 1 : 0 }}
            animate={{ opacity: index === currentVideoIndex ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        ))}
        {/* Fallback background for mobile */}
        <div className="absolute inset-0 bg-[url('/heritage-festival-celebration.jpg')] bg-cover bg-center md:hidden" />
      </motion.div>

      {/* Dark Glass Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/40" />

      {/* Confetti Animation */}
      {showConfetti && <Confetti />}

      {/* Content Container */}
      <div className="container mx-auto px-4 py- relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex justify-center mb-2 lg:mb-6"
          >
            <div className="relative rounded-full p-2 bg-white/10 backdrop-blur-sm shadow-2xl">
              <Image
                src="/assets/logo.png"
                alt="Maghey Sankranti Mela Logo"
                width={60}
                height={60}
                className="object-contain drop-shadow-2xl lg:w-20 lg:h-20"
                priority
              />
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full max-w-4xl mx-auto mb-6 md:max-w-3xl lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
          >
            <div className="relative w-full h-auto">
              <Image
                src="/mmhero.png"
                alt="Maghey Sankranti Mela 2026 - Jorethang, Nayabazar, Namchi District, Sikkim"
                width={1369}
                height={970}
                className="w-full h-auto object-contain drop-shadow-2xl rounded-lg"
                priority
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm md:text-lg text-gray-100 max-w-4xl mx-auto leading-relaxed drop-shadow-md mb-6"
          >
            Experience Sikkim's grandest cultural festival at the sacred
            confluence of Rangeet and Rammam rivers. Celebrating 71 years of
            heritage, tradition, and unity from{" "}
            <span className="text-amber-400 font-semibold">
              January 14-21, 2026
            </span>{" "}
            at Jorethang Nayabazar, Namchi District.
          </motion.p>

          {/* Event Details */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Calendar className="h-5 w-5 text-amber-400" />
              <span className="text-white text-sm font-medium">
                Jan 14-21, 2026
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="h-5 w-5 text-amber-400" />
              <span className="text-white text-sm font-medium">
                Jorethang Nayabazar, Sikkim
              </span>
            </div>
          </motion.div> */}

          {/* Key Highlights */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xs md:text-sm text-white/90 max-w-3xl mx-auto mb-4"
          >
            <span className="text-amber-400">✨ Cultural Performances</span> •
            <span className="text-blue-400"> Adventure Activities</span> •
            <span className="text-green-400"> Sacred Holy Dips</span> •
            <span className="text-orange-400"> Local Handicrafts</span> •
            <span className="text-pink-400"> Traditional Cuisine</span>
          </motion.div> */}

          {/* Government Patronage */}
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xs md:text-sm text-white/80 max-w-2xl mx-auto font-medium drop-shadow-md mb-6"
          >
            Celebrating 50 Years of Sikkim Statehood • Presented under the
            patronage of the Government of Sikkim
          </motion.p> */}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 md:pt-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavigationBlocker href="/events">
                <Button
                  size="lg"
                  className="rounded-full px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  Explore Events & Activities
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </NavigationBlocker>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavigationBlocker href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-4 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/40 bg-white/10 text-white hover:bg-white/20"
                >
                  Learn Our Heritage
                </Button>
              </NavigationBlocker>
            </motion.div>
          </motion.div>

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="pt-6"
          >
            <p className="text-xs md:text-sm text-gray-300/80 font-light italic">
              "Where Rivers Meet, Where Cultures Converge, Where Hearts Meet in
              Joy"
            </p>
            <p className="text-xs text-gray-400/60 mt-2">
              Join thousands in celebrating tradition, adventure, and spiritual
              unity
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Named export for compatibility
export { Hero };
