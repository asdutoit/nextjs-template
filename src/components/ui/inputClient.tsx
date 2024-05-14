import * as React from "react";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [config] = useConfig();
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-input px-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          config.style === "default"
            ? "h-10 bg-background py-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2"
            : "h-9 bg-transparent py-1 shadow-sm transition-colors focus-visible:ring-1",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
