const SkillBadge = ({ name, iconUrl, level }) => {
    // Tùy màu viền theo level để tạo điểm nhấn
    const levelColors = {
        'BEGINNER': 'border-gray-600 text-gray-400',
        'INTERMEDIATE': 'border-blue-700/50 text-blue-400 bg-blue-900/20',
        'ADVANCED': 'border-purple-700/50 text-purple-400 bg-purple-900/20',
        'EXPERT': 'border-yellow-700/50 text-yellow-400 bg-yellow-900/20'
    };

    const colorClass = levelColors[level] || levelColors['INTERMEDIATE'];

    return (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${colorClass} transition-colors hover:bg-gray-700/50 cursor-default`}>
            {iconUrl ? (
                <img src={iconUrl} alt={name} className="w-5 h-5 object-contain" />
            ) : (
                <div className="w-2 h-2 rounded-full bg-current"></div>
            )}
            <span className="text-sm font-medium">{name}</span>
        </div>
    );
};

export default SkillBadge;