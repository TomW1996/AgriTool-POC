import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500",
        className
      )}
      {...props}
    />
  );
}