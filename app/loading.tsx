export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Simple Loading Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-amber-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-amber-500 rounded-full animate-spin"></div>
        </div>

        {/* Simple Loading Text */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
