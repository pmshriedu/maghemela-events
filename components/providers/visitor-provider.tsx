"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface VisitorContextType {
  hasCompletedForm: boolean;
  setHasCompletedForm: (completed: boolean) => void;
  isPopupVisible: boolean;
  setIsPopupVisible: (visible: boolean) => void;
  isAnonymousVisitor: boolean;
  setIsAnonymousVisitor: (anonymous: boolean) => void;
  skipAsAnonymous: () => void;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export { VisitorContext };

export function VisitorProvider({ children }: { children: ReactNode }) {
  const [hasCompletedForm, setHasCompletedForm] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAnonymousVisitor, setIsAnonymousVisitor] = useState(false);

  useEffect(() => {
    // Check if visitor has already completed the form or skipped
    const hasVisitedBefore =
      localStorage.getItem("hasVisitedBefore") === "true";
    const hasCompleted =
      localStorage.getItem("visitorFormCompleted") === "true";
    const isAnonymous = localStorage.getItem("visitorSkipped") === "true";

    if (hasVisitedBefore && (hasCompleted || isAnonymous)) {
      setHasCompletedForm(true);
      setIsAnonymousVisitor(isAnonymous);
    } else if (!hasVisitedBefore) {
      // New visitor - show popup after a delay
      const timer = setTimeout(() => {
        setIsPopupVisible(true);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSetHasCompletedForm = (completed: boolean) => {
    setHasCompletedForm(completed);
    if (completed) {
      localStorage.setItem("visitorFormCompleted", "true");
      setIsPopupVisible(false);
    }
  };

  const skipAsAnonymous = async () => {
    try {
      // Track anonymous visitor
      const visitorInfo = {
        anonymous: true,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
      };

      await fetch("/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitorInfo),
      });
    } catch (error) {
      console.error("Error tracking anonymous visitor:", error);
    }

    // Mark as skipped
    localStorage.setItem("hasVisitedBefore", "true");
    localStorage.setItem("visitorSkipped", "true");
    setIsAnonymousVisitor(true);
    setHasCompletedForm(true);
    setIsPopupVisible(false);
  };

  return (
    <VisitorContext.Provider
      value={{
        hasCompletedForm,
        setHasCompletedForm: handleSetHasCompletedForm,
        isPopupVisible,
        setIsPopupVisible,
        isAnonymousVisitor,
        setIsAnonymousVisitor,
        skipAsAnonymous,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error("useVisitor must be used within a VisitorProvider");
  }
  return context;
}
