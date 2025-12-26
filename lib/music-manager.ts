// Music Manager Singleton - persists across all page navigations
class MusicManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: (() => void)[] = [];
  private initialized = false;
  private currentTime = 0;
  private musicAllowed = true;

  constructor() {
    // Check if already exists on globalThis
    if (
      typeof globalThis !== "undefined" &&
      (globalThis as any).__musicManagerInstance
    ) {
      return (globalThis as any).__musicManagerInstance;
    }

    if (typeof globalThis !== "undefined") {
      (globalThis as any).__musicManagerInstance = this;
    }

    // Only initialize if we're in the browser
    if (typeof window !== "undefined") {
      this.initialize();
    }
  }

  private initialize() {
    if (this.initialized) return;
    this.initialized = true;

    // Create audio element
    this.audio = new Audio("/assets/music/loop-music.mp3");
    this.audio.loop = true;
    this.audio.preload = "auto";
    this.audio.volume = 0.7;

    // Restore current time from sessionStorage
    const savedTime = sessionStorage.getItem("music_current_time");
    if (savedTime) {
      this.currentTime = parseFloat(savedTime);
      this.audio.currentTime = this.currentTime;
    }

    // Set up event listeners
    this.audio.addEventListener("play", () => {
      this.isPlaying = true;
      localStorage.setItem("music_player_state", "playing");
      sessionStorage.removeItem("music_was_playing");
      this.notifyListeners();
    });

    this.audio.addEventListener("pause", () => {
      this.isPlaying = false;
      localStorage.setItem("music_player_state", "paused");
      this.notifyListeners();
    });

    this.audio.addEventListener("timeupdate", () => {
      if (this.audio && !this.audio.paused) {
        this.currentTime = this.audio.currentTime;
        sessionStorage.setItem(
          "music_current_time",
          this.currentTime.toString()
        );
      }
    });

    // Handle page visibility changes to ensure continuous playback
    document.addEventListener("visibilitychange", () => {
      if (
        document.visibilityState === "visible" &&
        this.isPlaying &&
        this.audio &&
        this.musicAllowed
      ) {
        // Page became visible again, ensure audio is still playing
        if (this.audio.paused && this.audio.currentTime > 0) {
          this.audio.play().catch(() => {
            // Play failed, will retry on user interaction
          });
        }
      }
    });

    // Handle before unload to save state
    window.addEventListener("beforeunload", () => {
      if (this.audio && !this.audio.paused) {
        sessionStorage.setItem(
          "music_current_time",
          this.audio.currentTime.toString()
        );
        sessionStorage.setItem("music_was_playing", "true");
      }
    });

    // Try to restore previous state
    const savedState = localStorage.getItem("music_player_state");
    const wasPlayingBefore =
      sessionStorage.getItem("music_was_playing") === "true";
    const shouldPlay = savedState === "playing" || wasPlayingBefore;

    if (shouldPlay) {
      // Delay autoplay to ensure DOM is ready
      setTimeout(() => {
        if (this.musicAllowed) {
          this.audio!.play().catch(() => {
            // Autoplay blocked - wait for user interaction
            this.isPlaying = false;
            this.notifyListeners();

            const startOnInteraction = () => {
              if (this.currentTime > 0) {
                this.audio!.currentTime = this.currentTime;
              }
              this.audio!.play()
                .then(() => {
                  this.isPlaying = true;
                  localStorage.setItem("music_player_state", "playing");
                  sessionStorage.removeItem("music_was_playing");
                  this.notifyListeners();
                })
                .catch(() => {
                  // Still blocked
                });
              document.removeEventListener("click", startOnInteraction);
              document.removeEventListener("touchstart", startOnInteraction);
            };

            document.addEventListener("click", startOnInteraction, {
              once: true,
            });
            document.addEventListener("touchstart", startOnInteraction, {
              once: true,
            });
          });
        }
      }, 100);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public togglePlay(): void {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      // Set current time before playing if we have a saved position
      if (this.currentTime > 0 && this.audio.currentTime === 0) {
        this.audio.currentTime = this.currentTime;
      }

      this.audio.play().catch(() => {
        // Play failed - will be handled by user interaction listeners
      });
    }
  }

  public setMusicAllowed(allowed: boolean): void {
    this.musicAllowed = allowed;
    if (!allowed && this.isPlaying) {
      this.audio?.pause();
    }
  }

  public downloadMusic(): void {
    const link = document.createElement("a");
    link.href = "/assets/music/loop-music.mp3";
    link.download = "Maghey-Sankranti-Mela-Music.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}

// Export singleton instance
let musicManagerInstance: MusicManager;

if (typeof globalThis !== "undefined") {
  if ((globalThis as any).__musicManagerInstance) {
    musicManagerInstance = (globalThis as any).__musicManagerInstance;
  } else {
    musicManagerInstance = new MusicManager();
    (globalThis as any).__musicManagerInstance = musicManagerInstance;
  }
} else {
  musicManagerInstance = new MusicManager();
}

export { musicManagerInstance as musicManager };
