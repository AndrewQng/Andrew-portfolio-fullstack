import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaLink } from 'react-icons/fa';
import { getUserProfile } from '../../services/userService.js';

const getSocialIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <FaGithub size={20} />;
    if (p.includes('linkedin')) return <FaLinkedin size={20} />;
    if (p.includes('facebook')) return <FaFacebook size={20} />;
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
        <footer className="bg-gray-950 border-t border-gray-800 py-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold tracking-wider mb-2">
                        <span className="text-blue-500">{middleName} </span>
                        <span className="text-white">{lastName}</span>
                    </h3>
                    <p className="text-gray-500 text-sm">{profile?.jobTitle || 'Xây dựng phần mềm với sự tỉ mỉ.'}</p>
                </div>

                <div className="flex gap-6 text-gray-400">
                    {profile?.socialLinks?.map((social, index) => (
                        <a 
                            key={index} 
                            href={social.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="hover:text-blue-500 transition-colors"
                        >
                            {getSocialIcon(social.platform)}
                        </a>
                    ))}
                </div>
            </div>
            <div className="text-center mt-8 text-gray-600 text-sm">
                &copy; {currentYear} {profile?.fullName || 'Nguyen Manh Quyen'}. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;