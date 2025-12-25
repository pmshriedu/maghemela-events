"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  downloadMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Create audio element
    const audio = new Audio("/assets/music/loop-music.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    // Check localStorage for previous state
    const savedState = localStorage.getItem("music_player_state");
    const shouldPlay = savedState === "playing";

    const handlePlay = () => {
      setIsPlaying(true);
      localStorage.setItem("music_player_state", "playing");
    };

    const handlePause = () => {
      setIsPlaying(false);
      localStorage.setItem("music_player_state", "paused");
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Try to resume or autoplay
    const tryPlay = async () => {
      try {
        if (shouldPlay || !savedState) {
          // Play if was playing before or first visit
          await audio.play();
          setIsPlaying(true);
          localStorage.setItem("music_player_state", "playing");
        }
      } catch (error) {
        // Autoplay blocked - wait for user interaction
        setIsPlaying(false);

        const startOnInteraction = () => {
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
              localStorage.setItem("music_player_state", "playing");
            })
            .catch(() => {
              // Still blocked
            });
          document.removeEventListener("click", startOnInteraction);
          document.removeEventListener("touchstart", startOnInteraction);
        };

        document.addEventListener("click", startOnInteraction, { once: true });
        document.addEventListener("touchstart", startOnInteraction, {
          once: true,
        });
      }
    };

    if (audio.readyState >= 2) {
      tryPlay();
    } else {
      audio.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Play failed
        });
      }
    }
  };

  const downloadMusic = () => {
    const link = document.createElement("a");
    link.href = "/assets/music/loop-music.mp3";
    link.download = "Maghey-Sankranti-Mela-Music.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const value = {
    isPlaying,
    togglePlay,
    downloadMusic,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};
