import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex items-center justify-center">
      <div className={cn("flex flex-col items-center gap-4", className)}>
        <div
          className="w-12 h-12 border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent 
          rounded-full animate-spin"
        />
        <p className="text-lg font-medium text-foreground">Please wait...</p>
      </div>
    </div>
  );
}
