const Card = ({ children, className = "", hoverEffect = true }) => {
    return (
        <div className={`
            bg-gray-800 rounded-xl border border-gray-700 overflow-hidden
            ${hoverEffect ? 'transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20' : ''}
            ${className}
        `}>
            {children}
        </div>
    );
};

export default Card;