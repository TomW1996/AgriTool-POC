export function Button({ children, className, ...props }) {
    return (
        <button
            className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
