import React from 'react';

const AdminSidebarTab = ({ id, label, icon, isActive, onClick }) => {
    return (
        <button
            onClick={() => onClick(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                    ? 'text-white shadow-lg shadow-[var(--color-primary)]/20' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
            }`}
            style={isActive ? { background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' } : {}}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );
};

export default AdminSidebarTab;
