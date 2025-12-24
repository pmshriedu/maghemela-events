"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Gift,
  X,
  AlertTriangle,
  Percent,
  Home,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useVisitor } from "@/components/providers/visitor-provider";

interface VisitorData {
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  city: string;
  purpose?: string;
  source?: string;
}

interface VisitorTrackingPopupProps {
  onVisitorSubmit: () => void;
  onSkip: () => void;
}

// Skip Confirmation Modal
function SkipConfirmationModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-card border border-border rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
            Wait! You&apos;re Missing Out! 🎁
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            By skipping registration, you&apos;ll miss:
          </p>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
              <Percent className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xl sm:text-2xl font-bold">10% OFF</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-500 mt-1">
              on all homestay accommodations!
            </p>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
            Register now and save big on your next stay in our beautiful region.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={onCancel}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm sm:text-base py-2 sm:py-2.5"
            >
              <Gift className="w-4 h-4 mr-2" />
              Get My 10% Off
            </Button>
            <Button
              variant="outline"
              onClick={onConfirm}
              className="flex-1 text-muted-foreground hover:text-foreground text-sm sm:text-base py-2 sm:py-2.5"
            >
              Skip Anyway
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function VisitorTrackingPopup({
  onVisitorSubmit,
  onSkip,
}: VisitorTrackingPopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSkipConfirmation, setShowSkipConfirmation] = useState(false);
  const [purpose, setPurpose] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VisitorData>();

  // Update form values when select changes
  const handlePurposeChange = (value: string) => {
    setPurpose(value);
    setValue("purpose", value);
  };

  const handleSourceChange = (value: string) => {
    setSource(value);
    setValue("source", value);
  };

  const onSubmit = async (data: VisitorData) => {
    setIsSubmitting(true);

    try {
      const visitorInfo = {
        ...data,
        purpose: purpose || data.purpose,
        source: source || data.source,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
      };

      const response = await fetch("/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitorInfo),
      });

      if (response.ok) {
        setSubmitted(true);
        // Mark user as having visited before (for future visits)
        localStorage.setItem("hasVisitedBefore", "true");
        // Close popup after success
        setTimeout(() => {
          onVisitorSubmit();
        }, 2500);
      }
    } catch (error) {
      console.error("Error submitting visitor data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipClick = () => {
    setShowSkipConfirmation(true);
  };

  const handleConfirmSkip = () => {
    setShowSkipConfirmation(false);
    onSkip();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card border border-border rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md mx-4 text-center shadow-2xl"
      >
        <div className="text-5xl sm:text-6xl mb-4">🙏</div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Thank You for Registering!
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-4">
          Your information has been recorded successfully.
        </p>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-3 sm:p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm sm:text-base">
              10% Discount Unlocked!
            </span>
          </div>
          <p className="text-xs text-green-600/80 dark:text-green-500/80 mt-1">
            Use code at our homestay booking
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-card border border-border rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
      >
        {/* Header with Offer Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-3 sm:p-4 relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-50"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 animate-pulse" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wide">
                Exclusive Offer
              </span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 animate-pulse" />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center">
              <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight">
                Get 10% OFF on Homestay Accommodation
              </span>
            </div>
            <p className="text-center text-[10px] sm:text-xs md:text-sm opacity-90 mt-1 px-2">
              Register now to unlock this special discount!
            </p>
          </div>
        </div>

        {/* Main Content with Scrollable Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-4"
          >
            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-xs sm:text-sm font-medium"
                >
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  placeholder="Your name"
                  className="mt-1 text-sm sm:text-base h-9 sm:h-10"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-medium"
                >
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="your@email.com"
                  className="mt-1 text-sm sm:text-base h-9 sm:h-10"
                />
              </div>
            </div>

            {/* Phone and City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label
                  htmlFor="phone"
                  className="text-xs sm:text-sm font-medium"
                >
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[\+]?[0-9\s\-\(\)]+$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-1 text-sm sm:text-base h-9 sm:h-10"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="city"
                  className="text-xs sm:text-sm font-medium"
                >
                  City <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="city"
                    {...register("city", {
                      required: "City is required",
                    })}
                    placeholder="Your city"
                    className="pl-10 text-sm sm:text-base h-9 sm:h-10"
                  />
                </div>
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <Label
                htmlFor="location"
                className="text-xs sm:text-sm font-medium"
              >
                Location (Optional)
              </Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  {...register("location")}
                  placeholder="State/Country"
                  className="pl-10 text-sm sm:text-base h-9 sm:h-10"
                />
              </div>
            </div>

            {/* Purpose and Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label
                  htmlFor="purpose"
                  className="text-xs sm:text-sm font-medium"
                >
                  What brings you here?
                </Label>
                <div className="mt-1">
                  <Select onValueChange={handlePurposeChange} value={purpose}>
                    <SelectTrigger className="w-full text-sm sm:text-base h-9 sm:h-10">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      <SelectItem value="festival-info">
                        Festival information
                      </SelectItem>
                      <SelectItem value="events">
                        Interested in events
                      </SelectItem>
                      <SelectItem value="accommodation">
                        Seeking accommodation
                      </SelectItem>
                      <SelectItem value="cultural-interest">
                        Cultural interest
                      </SelectItem>
                      <SelectItem value="tourism">Tourism</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="media">Media/Press</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label
                  htmlFor="source"
                  className="text-xs sm:text-sm font-medium"
                >
                  How did you find us?
                </Label>
                <div className="mt-1">
                  <Select onValueChange={handleSourceChange} value={source}>
                    <SelectTrigger className="w-full text-sm sm:text-base h-9 sm:h-10">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="word-of-mouth">
                        Word of Mouth
                      </SelectItem>
                      <SelectItem value="news">News/Articles</SelectItem>
                      <SelectItem value="tourism-board">
                        Tourism Board
                      </SelectItem>
                      <SelectItem value="direct">Typed URL directly</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4 space-y-2 sm:space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm sm:text-lg py-2 sm:py-3 font-semibold h-10 sm:h-12"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Register & Get 10% Off
                  </>
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSkipClick}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  Skip for now
                </button>
              </div>
            </div>
          </form>

          <p className="text-[10px] sm:text-xs text-muted-foreground mt-3 sm:mt-4 text-center">
            Your privacy is important to us. This information helps us improve
            our services and understand our visitors better.
          </p>
        </div>
      </motion.div>

      {/* Skip Confirmation Modal */}
      <AnimatePresence>
        {showSkipConfirmation && (
          <SkipConfirmationModal
            onConfirm={handleConfirmSkip}
            onCancel={() => setShowSkipConfirmation(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function VisitorTrackingWrapper() {
  const {
    hasCompletedForm,
    setHasCompletedForm,
    isPopupVisible,
    skipAsAnonymous,
  } = useVisitor();
  const [submitted, setSubmitted] = useState(false);

  // Prevent escape key and other keyboard shortcuts when popup is shown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPopupVisible || hasCompletedForm) return;

      // Prevent escape key
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
      // Prevent Ctrl+W, Ctrl+Shift+W, Alt+F4
      if (
        (e.ctrlKey && e.key === "w") ||
        (e.ctrlKey && e.shiftKey && e.key === "W") ||
        (e.altKey && e.key === "F4")
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPopupVisible && !hasCompletedForm) {
        e.preventDefault();
        e.returnValue =
          "Please complete the visitor registration form before leaving.";
        return "Please complete the visitor registration form before leaving.";
      }
    };

    if (isPopupVisible && !hasCompletedForm) {
      document.addEventListener("keydown", handleKeyDown, true);
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPopupVisible, hasCompletedForm]);

  if (hasCompletedForm || !isPopupVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-2 sm:p-4"
      onClick={(e) => e.stopPropagation()} // Prevent closing by clicking outside
    >
      <AnimatePresence>
        <VisitorTrackingPopup
          onVisitorSubmit={() => {
            setSubmitted(true);
            setTimeout(() => {
              setHasCompletedForm(true);
            }, 2500);
          }}
          onSkip={skipAsAnonymous}
        />
      </AnimatePresence>
    </div>
  );
}
