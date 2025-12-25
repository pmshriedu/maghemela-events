"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { musicManager } from "@/lib/music-manager";

const FloatingMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(musicManager.getIsPlaying());

  useEffect(() => {
    // Subscribe to music manager updates
    const unsubscribe = musicManager.subscribe(() => {
      setIsPlaying(musicManager.getIsPlaying());
    });

    // Initial sync
    setIsPlaying(musicManager.getIsPlaying());

    return unsubscribe;
  }, []);

  const togglePlay = () => {
    musicManager.togglePlay();
  };

  const handleDownload = () => {
    musicManager.downloadMusic();
  };

  return (
    <div className="fixed bottom-20 sm:bottom-8 left-4 z-50 flex items-center gap-1 sm:gap-2 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-full px-2 sm:px-3 py-1 sm:py-2 shadow-lg hover:shadow-xl transition-all duration-300">
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
    </div>
  );
};

export default FloatingMusicPlayer;
