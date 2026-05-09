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
        primary: "text-white shadow-lg border-0",
        outline: "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-transparent hover:border-transparent",
        ghost: "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
        danger: "bg-red-50 dark:bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-200 dark:border-red-600/20"
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

    // Dynamic styles based on variant
    let dynamicStyle = {};
    if (variant === 'primary') {
        dynamicStyle = { 
            background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
            boxShadow: '0 4px 14px 0 color-mix(in srgb, var(--color-primary) 30%, transparent)'
        };
    } else if (variant === 'outline') {
        // Outline doesn't need inline background, but on hover it might?
        // We'll leave it as CSS classes for default outline
    }

    const combinedStyles = { ...dynamicStyle, ...(props.style || {}) };
    const hoverEffect = (variant === 'primary' || variant === 'outline') ? 'hover:opacity-90 hover:scale-[1.02]' : '';

    // Xử lý loại thẻ (Link nội bộ, Link ngoài, hoặc Button)
    if (to) return <Link to={to} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${hoverEffect} ${className}`} style={combinedStyles} {...props}>{content}</Link>;
    if (href) return <a href={href} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${hoverEffect} ${className}`} style={combinedStyles} {...props}>{content}</a>;

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${hoverEffect} ${className}`} style={combinedStyles} disabled={isLoading} {...props}>
            {content}
        </button>
    );
};

export default Button;