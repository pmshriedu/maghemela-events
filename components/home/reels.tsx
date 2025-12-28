"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

const reels = [
  {
    src: "/assets/shorts-video/reel3.mp4",
    title: "Homestay Experience",
    description: "Traditional homestays offering genuine local hospitality",
  },
  {
    src: "/assets/shorts-video/reel2.mp4",
    title: "Village Cultural Tour",
    description: "Immerse yourself in authentic Sikkimese village culture",
  },
  {
    src: "/assets/shorts-video/reel1.mp4",
    title: "Mountain Trek Adventure",
    description: "Thrilling mountain treks through Sikkim's pristine trails",
  },
  {
    src: "/assets/shorts-video/Passing_Through_Kitam_Bird_Sanctuary_sikkim_visitsikkim_travel_biketrip_720P.mp4",
    title: "Kitam Bird Sanctuary",
    description: "Discover the avian paradise at Kitam Bird Sanctuary",
  },
  {
    src: "/assets/shorts-video/Famous_Place_Tatopani_Ko_Mini_Vlog_Sikkim_Hot_Spring_720P.mp4",
    title: "Tatopani Hot Springs",
    description:
      "Experience the natural hot springs and scenic beauty of Tatopani",
  },
  {
    src: "/assets/shorts-video/chakung_west_sikkim_720P.mp4",
    title: "Chakung - West Sikkim",
    description:
      "Explore the breathtaking landscapes of Chakung in West Sikkim",
  },
];

export function Reels() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRefs = useRef<(IntersectionObserver | null)[]>([]);

  const playVideo = (index: number) => {
    if (videoRefs.current[index]) {
      // Pause all other videos first to prevent audio overlap
      videoRefs.current.forEach((video, i) => {
        if (i !== index && video) {
          video.pause();
        }
      });

      const video = videoRefs.current[index];
      video?.play().catch((error) => {
        console.log("Video play failed:", error);
      });
    }
  };

  const toggleMute = () => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (!currentVideo) return;

    currentVideo.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Check if we're on desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Auto-cycle through videos on desktop (removed - now uses video end event)
  useEffect(() => {
    // No longer needed - videos will auto-advance when they end
  }, [isDesktop]);

  // Play current video when index changes
  useEffect(() => {
    if (videoRefs.current[currentReelIndex]) {
      playVideo(currentReelIndex);
    }
  }, [currentReelIndex]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const index = parseInt(entry.target.getAttribute("data-index") || "0");
      if (entry.isIntersecting) {
        // Video is in view, play it
        setCurrentReelIndex(index);
        playVideo(index);
      } else {
        // Video is out of view, pause it
        if (videoRefs.current[index]) {
          videoRefs.current[index]?.pause();
        }
      }
    });
  };

  useEffect(() => {
    // Set up Intersection Observer after component mounts
    const setupObservers = () => {
      if (!containerRef.current) return;

      reels.forEach((_, index) => {
        const observer = new IntersectionObserver(handleIntersection, {
          threshold: 0.5,
          root: containerRef.current,
        });
        observerRefs.current[index] = observer;
      });

      // Observe videos that are already mounted
      videoRefs.current.forEach((video, index) => {
        if (video && observerRefs.current[index]) {
          observerRefs.current[index]?.observe(video);
        }
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(setupObservers, 100);

    return () => {
      clearTimeout(timer);
      observerRefs.current.forEach((observer) => {
        observer?.disconnect();
      });
    };
  }, []);

  useEffect(() => {
    // Auto-play first video when it's loaded
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      const handleLoadedData = () => {
        playVideo(0);
      };

      firstVideo.addEventListener("loadeddata", handleLoadedData);

      // If already loaded, play immediately
      if (firstVideo.readyState >= 2) {
        playVideo(0);
      }

      return () => {
        firstVideo.removeEventListener("loadeddata", handleLoadedData);
      };
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

        {/* Desktop Layout: Single Video + Content */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Video Section */}
          <div className="relative">
            <div className="relative w-full max-w-sm mx-auto h-150 bg-black rounded-lg overflow-hidden">
              <video
                ref={(el) => {
                  videoRefs.current[currentReelIndex] = el;
                }}
                src={reels[currentReelIndex].src}
                className="w-full h-full object-cover"
                muted={isMuted}
                playsInline
                preload="metadata"
                autoPlay
                onEnded={() => {
                  // Pause current video and advance to next
                  const currentVideo = videoRefs.current[currentReelIndex];
                  if (currentVideo) {
                    currentVideo.pause();
                  }
                  setCurrentReelIndex((prev) => (prev + 1) % reels.length);
                }}
                onError={(e) => {
                  console.error(`Video ${currentReelIndex} failed to load:`, e);
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

              {/* Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="text-white flex-1">
                  <h3 className="text-lg font-semibold">
                    {reels[currentReelIndex].title}
                  </h3>
                  <p className="text-sm text-white/80 mt-1">
                    {reels[currentReelIndex].description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {reels.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReelIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentReelIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
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
                  data-index={index}
                  className="w-full h-full object-cover"
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  onLoadedData={() => {
                    // Auto-play when video is loaded
                    if (index === currentReelIndex) {
                      setTimeout(() => playVideo(index), 100);
                    }
                  }}
                  onEnded={() => {
                    // Pause current video and advance to next
                    const currentVideo = videoRefs.current[index];
                    if (currentVideo) {
                      currentVideo.pause();
                    }
                    setCurrentReelIndex((prev) => (prev + 1) % reels.length);
                  }}
                  onError={(e) => {
                    console.error(`Video ${index} failed to load:`, e);
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="text-white flex-1">
                    <h3 className="text-lg font-semibold">{reel.title}</h3>
                    <p className="text-sm text-white/80 mt-1">
                      {reel.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
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
