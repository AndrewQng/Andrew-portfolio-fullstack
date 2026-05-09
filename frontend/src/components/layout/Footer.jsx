import { useState, useEffect } from 'react';
import { 
    FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaInstagram, 
    FaYoutube, FaTiktok, FaBehance, FaDribbble, FaGlobe, 
    FaLink 
} from 'react-icons/fa';
import { getUserProfile } from '../../services/userService.js';

const getSocialIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <FaGithub size={20} />;
    if (p.includes('linkedin')) return <FaLinkedin size={20} />;
    if (p.includes('facebook')) return <FaFacebook size={20} />;
    if (p.includes('twitter') || p.includes('x.com')) return <FaTwitter size={20} />;
    if (p.includes('instagram')) return <FaInstagram size={20} />;
    if (p.includes('youtube')) return <FaYoutube size={20} />;
    if (p.includes('tiktok')) return <FaTiktok size={20} />;
    if (p.includes('behance')) return <FaBehance size={20} />;
    if (p.includes('dribbble')) return <FaDribbble size={20} />;
    if (p.includes('website')) return <FaGlobe size={20} />;
    return <FaLink size={20} />;
};

const Footer = () => {
    const [profile, setProfile] = useState(null);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfile(data);
            } catch (error) {
                console.error("Lỗi tải Footer:", error);
            }
        };
        fetchProfile();
    }, []);

    // Lấy tên đệm + tên để làm Logo (vd: Nguyễn Mạnh Quyền -> Mạnh Quyền)
    const nameParts = profile?.fullName ? profile.fullName.split(' ') : ['Quyen', 'Dev'];
    const lastName = nameParts[nameParts.length - 1];
    const middleName = nameParts.length > 1 ? nameParts[nameParts.length - 2] : '';

    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 py-10 transition-colors duration-300 relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold tracking-wider mb-2">
                        <span style={{ color: 'var(--color-primary)' }}>{middleName} </span>
                        <span className="text-gray-900 dark:text-white transition-colors duration-300">{lastName}</span>
                    </h3>
                    <p className="text-gray-500 text-sm transition-colors duration-300 mb-4">{profile?.jobTitle || 'Xây dựng phần mềm với sự tỉ mỉ.'}</p>
                    
                    <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        {profile?.email && <p>Email: {profile.email}</p>}
                        {profile?.phone && <p>SĐT: {profile.phone}</p>}
                        {profile?.address && <p>Địa chỉ: {profile.address}</p>}
                    </div>

                    {profile?.visitorStats && (
                        <div className="flex flex-wrap gap-3 mt-4 text-xs font-semibold justify-center md:justify-start">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800/30 transition-colors duration-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                Lượt xem: {profile.visitorStats.totalViews}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full border border-purple-200 dark:border-purple-800/30 transition-colors duration-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                Khách truy cập: {profile.visitorStats.uniqueVisitors}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex gap-6 text-gray-500 dark:text-gray-400">
                    {profile?.socialLinks?.map((social, index) => (
                        <a 
                            key={index} 
                            href={social.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="transition-colors hover:text-gray-900 dark:hover:text-white"
                            style={{ '--hover-color': 'var(--color-primary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = ''}
                        >
                            {getSocialIcon(social.platform)}
                        </a>
                    ))}
                </div>
            </div>
            <div className="text-center mt-8 text-gray-400 dark:text-gray-600 text-sm transition-colors duration-300">
                &copy; {currentYear} {profile?.fullName || 'Nguyen Manh Quyen'}. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;