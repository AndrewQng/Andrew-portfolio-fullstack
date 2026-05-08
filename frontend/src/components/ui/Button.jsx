import { Link } from 'react-router-dom';

const Button = ({ 
    children, 
    onClick, 
    to,           // Nếu có 'to', nó sẽ là Link của React Router
    href,         // Nếu có 'href', nó sẽ là thẻ <a> (dùng cho link ngoài hoặc download CV)
    variant = "primary", 
    size = "md",
    isLoading = false,
    icon: Icon,
    className = "",
    ...props 
}) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50";
    
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20",
        outline: "border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-500",
        ghost: "text-gray-400 hover:bg-gray-800 hover:text-white",
        danger: "bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-600/20"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-4 text-base"
    };

    const content = (
        <>
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : Icon && <Icon size={size === 'lg' ? 20 : 18} />}
            {children}
        </>
    );

    // Xử lý loại thẻ (Link nội bộ, Link ngoài, hoặc Button)
    if (to) return <Link to={to} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{content}</Link>;
    if (href) return <a href={href} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{content}</a>;

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} disabled={isLoading} {...props}>
            {content}
        </button>
    );
};

export default Button;