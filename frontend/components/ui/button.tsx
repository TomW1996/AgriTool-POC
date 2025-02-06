import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
