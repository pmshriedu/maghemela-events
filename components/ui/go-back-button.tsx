"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function GoBackButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => window.history.back()}
      className="w-full sm:w-auto border-amber-500/30 text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10"
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      Go Back
    </Button>
  );
}
