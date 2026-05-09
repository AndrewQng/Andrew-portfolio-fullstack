import { motion } from 'framer-motion';

const SkillBadge = ({ name, iconUrl, level }) => {
    // Dynamic styles based on level, using CSS variables for theme integration
    let style = {};
    if (level === 'Expert' || level === 'EXPERT') {
        style = { borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)', background: 'color-mix(in srgb, var(--color-secondary) 15%, transparent)' };
    } else if (level === 'Advanced' || level === 'ADVANCED') {
        style = { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', background: 'color-mix(in srgb, var(--color-primary) 15%, transparent)' };
    } else if (level === 'Intermediate' || level === 'INTERMEDIATE') {
        style = { borderColor: '#60a5fa', color: '#60a5fa', background: 'rgba(96, 165, 250, 0.1)' }; // blue-400
    } else {
        style = { borderColor: '#4b5563', color: '#9ca3af' }; // gray-600 / gray-400
    }

    return (
        <motion.div 
            whileHover={{ scale: 1.1, boxShadow: `0 0 15px ${style.color}` }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all cursor-default"
            style={style}
        >
            {iconUrl ? (
                <img src={iconUrl} alt={name} className="w-6 h-6 object-contain" />
            ) : (
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.color }}></div>
            )}
            <span className="text-sm font-bold tracking-wide">{name}</span>
        </motion.div>
    );
};

export default SkillBadge;