"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

const reels = [
  {
    src: "/assets/shorts-video/reel1.mp4",
    title: "Mountain Trek Adventure",
  },
  {
    src: "/assets/shorts-video/reel2.mp4",
    title: "Village Cultural Tour",
  },
  {
    src: "/assets/shorts-video/reel3.mp4",
    title: "Homestay Experience",
  },
];

export function Reels() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const reelHeight = container.clientHeight;
    const newIndex = Math.round(scrollTop / reelHeight);

    if (
      newIndex !== currentReelIndex &&
      newIndex >= 0 &&
      newIndex < reels.length
    ) {
      // Pause previous video
      if (videoRefs.current[currentReelIndex]) {
        videoRefs.current[currentReelIndex]?.pause();
      }

      // Play new video
      if (videoRefs.current[newIndex]) {
        videoRefs.current[newIndex]?.play();
        setCurrentReelIndex(newIndex);
      }
    }
  };

  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (!currentVideo) return;

    if (isPlaying) {
      currentVideo.pause();
    } else {
      currentVideo.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (!currentVideo) return;

    currentVideo.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentReelIndex]);

  useEffect(() => {
    // Auto-play first video
    if (videoRefs.current[0]) {
      videoRefs.current[0].play();
    }
  }, []);

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
            Adventure Shorts
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Experience thrilling adventures and outdoor activities at Maghey
            Sankranti Mela
          </p>
        </motion.div>

        {/* Desktop Layout: Video + Content */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Video Section */}
          <div className="relative">
            <div
              ref={containerRef}
              className="relative w-full max-w-sm mx-auto h-150 overflow-y-auto snap-y snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {reels.map((reel, index) => (
                <div
                  key={index}
                  className="relative w-full h-150 snap-start flex items-center justify-center bg-black rounded-lg overflow-hidden"
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={reel.src}
                    className="w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                  {/* Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="text-white">
                      <h3 className="text-lg font-semibold">{reel.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={togglePlayPause}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX size={20} />
                        ) : (
                          <Volume2 size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex gap-1">
                      {reels.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i === currentReelIndex ? "bg-white" : "bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-amber-900">
                Discover Adventure
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Embark on thrilling adventures amidst the breathtaking
                landscapes of Sikkim. From mountain treks to cultural
                explorations, experience the perfect blend of adventure and
                tradition at Maghey Sankranti Mela.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Join us for an unforgettable journey through scenic trails,
                local villages, and traditional homestays that offer authentic
                Sikkimese experiences.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Mountain Treks & Hiking
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Cultural Village Tours
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Homestay Experiences
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Local Cuisine Adventures
                </span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>Inquire About Adventures</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Video Only */}
        <div className="lg:hidden">
          <div
            ref={containerRef}
            className="relative w-full max-w-sm mx-auto h-150 overflow-y-auto snap-y snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reels.map((reel, index) => (
              <div
                key={index}
                className="relative w-full h-150 snap-start flex items-center justify-center bg-black rounded-lg overflow-hidden"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={reel.src}
                  className="w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold">{reel.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={togglePlayPause}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex gap-1">
                    {reels.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i === currentReelIndex ? "bg-white" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="text-center mt-8 lg:hidden">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span>Inquire About Adventures</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
