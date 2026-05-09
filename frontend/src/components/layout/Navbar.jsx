import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { FaSun, FaMoon, FaUserShield } from 'react-icons/fa';
import { getUserProfile } from '../../services/userService.js';

const Navbar = ({ brandNameProp }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [brandName, setBrandName] = useState('QuyenDev');

    useEffect(() => {
        if (brandNameProp) {
            setBrandName(brandNameProp);
            return;
        }
        const fetchBrand = async () => {
            try {
                const data = await getUserProfile();
                if (data && data.brandName) {
                    setBrandName(data.brandName);
                }
            } catch (error) {
                console.error("Lỗi lấy Brand Name:", error);
            }
        };
        fetchBrand();
    }, [brandNameProp]);

    // Split brand name into two parts for premium accent coloring (e.g. QuyenDev -> Quyen + Dev)
    const renderBrandName = (name) => {
        if (!name) return <>Quyen<span className="text-gray-900 dark:text-white transition-colors duration-300">Dev</span></>;
        
        // Split on uppercase characters if CamelCase (like QuyenDev)
        const uppercaseIndices = [];
        for (let i = 1; i < name.length; i++) {
            if (name[i] === name[i].toUpperCase() && name[i] !== ' ' && name[i-1] !== ' ') {
                uppercaseIndices.push(i);
            }
        }
        
        if (uppercaseIndices.length > 0) {
            const splitIndex = uppercaseIndices[0];
            return (
                <>
                    <span style={{ color: 'var(--color-primary)' }}>{name.substring(0, splitIndex)}</span>
                    <span className="text-gray-900 dark:text-white transition-colors duration-300">{name.substring(splitIndex)}</span>
                </>
            );
        }
        
        // Split by space
        const parts = name.split(' ');
        if (parts.length > 1) {
            return (
                <>
                    <span style={{ color: 'var(--color-primary)' }}>{parts[0]}</span>
                    <span className="text-gray-900 dark:text-white transition-colors duration-300"> {parts.slice(1).join(' ')}</span>
                </>
            );
        }
        
        // Split in half
        const half = Math.ceil(name.length / 2);
        return (
            <>
                <span style={{ color: 'var(--color-primary)' }}>{name.substring(0, half)}</span>
                <span className="text-gray-900 dark:text-white transition-colors duration-300">{name.substring(half)}</span>
            </>
        );
    };

    return (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                
                {/* Logo thương hiệu */}
                <Link to="/" className="text-2xl font-bold tracking-wider">
                    {renderBrandName(brandName)}
                </Link>

                {/* Menu điều hướng chính */}
                <div className="hidden md:flex gap-8 text-gray-600 dark:text-gray-300 font-medium">
                    <a href="#about" className="hover:text-gray-900 dark:hover:text-white transition-colors" style={{ '--hover-color': 'var(--color-primary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Giới thiệu</a>
                    <a href="#portfolio" className="hover:text-gray-900 dark:hover:text-white transition-colors" style={{ hoverColor: 'var(--color-primary)' }}>Dự án</a>
                    <a href="#skills" className="hover:text-gray-900 dark:hover:text-white transition-colors" style={{ hoverColor: 'var(--color-primary)' }}>Kỹ năng</a>
                    <a href="#experience" className="hover:text-gray-900 dark:hover:text-white transition-colors" style={{ hoverColor: 'var(--color-primary)' }}>Kinh nghiệm</a>
                </div>

                <div className="flex items-center gap-4">
                    {/* Toggle Light/Dark Mode */}
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </button>

                    {/* Nút vào trang Admin */}
                    <Link 
                        to="/admin/login" 
                        className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg transition-colors border border-gray-200 dark:border-gray-700 flex items-center justify-center"
                        aria-label="Admin"
                    >
                        <FaUserShield size={18} />
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;