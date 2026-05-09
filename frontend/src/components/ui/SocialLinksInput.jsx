import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaInstagram, 
    FaYoutube, FaTiktok, FaBehance, FaDribbble, FaGlobe, 
    FaTrash, FaPlus, FaChevronUp, FaChevronDown, FaCheckCircle, 
    FaTimesCircle, FaLink
} from 'react-icons/fa';
import ConfirmModal from './ConfirmModal.jsx';

const PLATFORM_CONFIGS = {
    GitHub: {
        color: 'hover:border-gray-800 dark:hover:border-gray-100',
        brandColor: 'text-gray-900 dark:text-gray-100',
        bgColor: 'bg-gray-100 dark:bg-gray-800/80',
        accentColor: 'border-gray-300 dark:border-gray-700 focus-within:border-gray-800 dark:focus-within:border-gray-100',
        placeholder: 'https://github.com/username',
        icon: FaGithub,
        pattern: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/
    },
    LinkedIn: {
        color: 'hover:border-blue-600 dark:hover:border-blue-500',
        brandColor: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-950/40',
        accentColor: 'border-blue-200 dark:border-blue-900 focus-within:border-blue-500 dark:focus-within:border-blue-400',
        placeholder: 'https://linkedin.com/in/username',
        icon: FaLinkedin,
        pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/
    },
    Facebook: {
        color: 'hover:border-blue-700 dark:hover:border-blue-600',
        brandColor: 'text-blue-700 dark:text-blue-500',
        bgColor: 'bg-blue-50 dark:bg-blue-950/30',
        accentColor: 'border-blue-200 dark:border-blue-900 focus-within:border-blue-600 dark:focus-within:border-blue-500',
        placeholder: 'https://facebook.com/username',
        icon: FaFacebook,
        pattern: /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/[a-zA-Z0-9_.-]+\/?$/
    },
    Twitter: {
        color: 'hover:border-sky-500 dark:hover:border-sky-400',
        brandColor: 'text-sky-500 dark:text-sky-400',
        bgColor: 'bg-sky-50 dark:bg-sky-950/30',
        accentColor: 'border-sky-200 dark:border-sky-900 focus-within:border-sky-500 dark:focus-within:border-sky-400',
        placeholder: 'https://twitter.com/username',
        icon: FaTwitter,
        pattern: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/
    },
    Instagram: {
        color: 'hover:border-pink-500 dark:hover:border-pink-400',
        brandColor: 'text-pink-500 dark:text-pink-400',
        bgColor: 'bg-pink-50 dark:bg-pink-950/30',
        accentColor: 'border-pink-200 dark:border-pink-900 focus-within:border-pink-500 dark:focus-within:border-pink-400',
        placeholder: 'https://instagram.com/username',
        icon: FaInstagram,
        pattern: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.-]+\/?$/
    },
    YouTube: {
        color: 'hover:border-red-600 dark:hover:border-red-500',
        brandColor: 'text-red-600 dark:text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-950/30',
        accentColor: 'border-red-200 dark:border-red-900 focus-within:border-red-600 dark:focus-within:border-red-500',
        placeholder: 'https://youtube.com/@channel',
        icon: FaYoutube,
        pattern: /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/|user\/|c\/|@)?[a-zA-Z0-9_-]+\/?$/
    },
    TikTok: {
        color: 'hover:border-black dark:hover:border-white',
        brandColor: 'text-gray-900 dark:text-gray-100',
        bgColor: 'bg-gray-100 dark:bg-gray-900/50',
        accentColor: 'border-gray-300 dark:border-gray-800 focus-within:border-gray-900 dark:focus-within:border-white',
        placeholder: 'https://tiktok.com/@username',
        icon: FaTiktok,
        pattern: /^(https?:\/\/)?(www\.)?tiktok\.com\/@[a-zA-Z0-9_.-]+\/?$/
    },
    Behance: {
        color: 'hover:border-blue-500 dark:hover:border-blue-400',
        brandColor: 'text-blue-500 dark:text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        accentColor: 'border-blue-200 dark:border-blue-900 focus-within:border-blue-500 dark:focus-within:border-blue-400',
        placeholder: 'https://behance.net/username',
        icon: FaBehance,
        pattern: /^(https?:\/\/)?(www\.)?behance\.net\/[a-zA-Z0-9_-]+\/?$/
    },
    Dribbble: {
        color: 'hover:border-pink-400 dark:hover:border-pink-300',
        brandColor: 'text-pink-500 dark:text-pink-400',
        bgColor: 'bg-pink-50 dark:bg-pink-950/20',
        accentColor: 'border-pink-200 dark:border-pink-900 focus-within:border-pink-500 dark:focus-within:border-pink-400',
        placeholder: 'https://dribbble.com/username',
        icon: FaDribbble,
        pattern: /^(https?:\/\/)?(www\.)?dribbble\.com\/[a-zA-Z0-9_-]+\/?$/
    },
    Website: {
        color: 'hover:border-emerald-500 dark:hover:border-emerald-400',
        brandColor: 'text-emerald-500 dark:text-emerald-400',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
        accentColor: 'border-emerald-200 dark:border-emerald-900 focus-within:border-emerald-500 dark:focus-within:border-emerald-400',
        placeholder: 'https://example.com',
        icon: FaGlobe,
        pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    }
};

const SOCIAL_PLATFORMS = Object.keys(PLATFORM_CONFIGS);

const SocialLinksInput = ({ value = [], onChange }) => {
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    
    const handleAdd = () => {
        const nextPlatform = SOCIAL_PLATFORMS.find(p => !value.some(link => link.platform === p)) || SOCIAL_PLATFORMS[0];
        const newLinks = [...value, { platform: nextPlatform, url: '' }];
        onChange(newLinks);
    };

    const handleDeleteClick = (index) => {
        setDeleteIndex(index);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteIndex !== null) {
            const newLinks = value.filter((_, i) => i !== deleteIndex);
            onChange(newLinks);
        }
        setIsConfirmOpen(false);
        setDeleteIndex(null);
    };

    const handleChangeField = (index, field, val) => {
        const newLinks = value.map((link, i) => {
            if (i === index) {
                return { ...link, [field]: val };
            }
            return link;
        });
        onChange(newLinks);
    };

    const handleMoveUp = (index) => {
        if (index === 0) return;
        const newLinks = [...value];
        const temp = newLinks[index];
        newLinks[index] = newLinks[index - 1];
        newLinks[index - 1] = temp;
        onChange(newLinks);
    };

    const handleMoveDown = (index) => {
        if (index === value.length - 1) return;
        const newLinks = [...value];
        const temp = newLinks[index];
        newLinks[index] = newLinks[index + 1];
        newLinks[index + 1] = temp;
        onChange(newLinks);
    };

    const validateUrl = (platform, url) => {
        if (!url) return null; // No display if empty
        const config = PLATFORM_CONFIGS[platform];
        if (!config || !config.pattern) return true; // Standard fallback
        return config.pattern.test(url);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mạng xã hội</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Liên kết hiển thị ở chân trang và phần giới thiệu</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all border border-transparent"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
                >
                    <FaPlus size={12} /> Thêm liên kết
                </motion.button>
            </div>

            <div className="space-y-3">
                <AnimatePresence initial={false}>
                    {value.map((link, index) => {
                        const platform = link.platform || 'Website';
                        const config = PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS.Website;
                        const PlatformIcon = config.icon || FaLink;
                        const isValid = validateUrl(platform, link.url);

                        return (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.8 }}
                                className={`group flex flex-col md:flex-row gap-3 items-stretch md:items-center bg-white/50 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 shadow-sm ${config.color} transition-all duration-300`}
                            >
                                {/* Reorder Controls */}
                                <div className="flex md:flex-col gap-1 justify-center items-center px-1 border-r border-gray-100 dark:border-gray-800 md:h-12 mr-1">
                                    <button
                                        type="button"
                                        onClick={() => handleMoveUp(index)}
                                        disabled={index === 0}
                                        className="p-1 rounded-md text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                        title="Di chuyển lên"
                                    >
                                        <FaChevronUp size={12} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleMoveDown(index)}
                                        disabled={index === value.length - 1}
                                        className="p-1 rounded-md text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                        title="Di chuyển xuống"
                                    >
                                        <FaChevronDown size={12} />
                                    </button>
                                </div>

                                {/* Icon Display & Select dropdown */}
                                <div className="flex items-center gap-3 w-full md:w-56">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${config.bgColor} ${config.brandColor} shadow-inner transition-colors duration-300`}>
                                        <PlatformIcon size={18} />
                                    </div>
                                    <div className="flex-grow">
                                        <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500 mb-0.5">Nền tảng</label>
                                        <select
                                            value={platform}
                                            onChange={(e) => handleChangeField(index, 'platform', e.target.value)}
                                            className="w-full bg-transparent border-0 text-sm font-semibold text-gray-800 dark:text-gray-200 focus:ring-0 focus:outline-none cursor-pointer pr-4"
                                        >
                                            {SOCIAL_PLATFORMS.map((opt) => (
                                                <option key={opt} value={opt} className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* URL Input with Dynamic placeholder and Live Validation */}
                                <div className="flex-grow relative">
                                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500 mb-0.5">Đường dẫn (URL)</label>
                                    <div className={`flex items-center border rounded-xl px-3 py-1 bg-white/20 dark:bg-gray-950/20 ${config.accentColor} transition-all duration-300`}>
                                        <input
                                            type="text"
                                            value={link.url}
                                            onChange={(e) => handleChangeField(index, 'url', e.target.value)}
                                            placeholder={config.placeholder}
                                            required
                                            className="w-full bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none border-none py-1 focus:ring-0 focus:outline-none"
                                        />
                                        
                                        {/* Validation indicator */}
                                        <div className="flex items-center ml-2">
                                            {isValid === true && (
                                                <span className="text-emerald-500" title="Đường dẫn hợp lệ">
                                                    <FaCheckCircle size={14} />
                                                </span>
                                            )}
                                            {isValid === false && (
                                                <span className="text-red-500" title="Đường dẫn không hợp lệ cho nền tảng này">
                                                    <FaTimesCircle size={14} />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Delete Action Button */}
                                <div className="flex items-end justify-end md:self-center">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={() => handleDeleteClick(index)}
                                        className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20 hover:text-red-600 transition-colors"
                                        title="Xóa liên kết"
                                    >
                                        <FaTrash size={14} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {(!value || value.length === 0) && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-8 px-4 border border-dashed border-gray-300 dark:border-gray-800 rounded-2xl text-center"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400 mb-2.5">
                            <FaLink size={18} />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Chưa có liên kết mạng xã hội nào</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Hãy nhấp vào nút "Thêm liên kết" để bắt đầu</p>
                    </motion.div>
                )}
            </div>

            {/* Modal xác nhận xóa */}
            <ConfirmModal 
                isOpen={isConfirmOpen}
                onClose={() => { setIsConfirmOpen(false); setDeleteIndex(null); }}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa liên kết"
                message={`Bạn có chắc chắn muốn xóa liên kết ${deleteIndex !== null ? value[deleteIndex]?.platform : ''} này không?`}
                confirmText="Xóa liên kết"
            />
        </div>
    );
};

export default SocialLinksInput;
