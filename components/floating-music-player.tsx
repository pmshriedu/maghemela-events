"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Play, Pause, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { musicManager } from "@/lib/music-manager";

const FloatingMusicPlayer: React.FC = () => {
  const pathname = usePathname();
  const [isPlaying, setIsPlaying] = useState(musicManager.getIsPlaying());

  useEffect(() => {
    // Subscribe to music manager updates
    const unsubscribe = musicManager.subscribe(() => {
      setIsPlaying(musicManager.getIsPlaying());
    });

    // Initial sync
    setIsPlaying(musicManager.getIsPlaying());

    // Set music allowed based on current page
    musicManager.setMusicAllowed(pathname === "/");

    // Pause music immediately if not on home page
    if (pathname !== "/") {
      if (musicManager.getIsPlaying()) {
        musicManager.togglePlay();
      }
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Update music allowed when pathname changes
    musicManager.setMusicAllowed(pathname === "/");

    // Pause music when not on home page
    if (pathname !== "/") {
      if (musicManager.getIsPlaying()) {
        musicManager.togglePlay();
      }
    }
  }, [pathname]);

  const togglePlay = () => {
    if (pathname === "/") {
      musicManager.togglePlay();
    }
  };

  const handleDownload = () => {
    musicManager.downloadMusic();
  };

  // Show only on home page
  if (pathname !== "/") {
    return null;
  }

  return (
    <>
      {/* Floating Music Player */}
      <motion.div
        className="fixed bottom-20 sm:bottom-8 left-4 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
      >
        <div className="flex items-center gap-2">
          {/* Music Player Button */}
          <motion.div
            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-full px-3 sm:px-4 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 h-8 sm:h-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white text-xs sm:text-sm font-medium mr-2">
              Theme Song
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full hover:bg-white/20 text-white hover:text-white"
            >
              {isPlaying ? (
                <Pause className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full hover:bg-white/20 text-white hover:text-white"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default FloatingMusicPlayer;
