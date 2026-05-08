import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                
                {/* Logo thương hiệu */}
                <Link to="/" className="text-2xl font-bold tracking-wider">
                    <span className="text-blue-500">Quyen</span>
                    <span className="text-white">Dev</span>
                </Link>

                {/* Menu điều hướng chính */}
                <div className="hidden md:flex gap-8 text-gray-300 font-medium">
                    <a href="#about" className="hover:text-blue-400 transition-colors">Giới thiệu</a>
                    <a href="#projects" className="hover:text-blue-400 transition-colors">Dự án</a>
                    <a href="#skills" className="hover:text-blue-400 transition-colors">Kỹ năng</a>
                    <a href="#experience" className="hover:text-blue-400 transition-colors">Kinh nghiệm</a>
                </div>

                {/* Nút vào trang Admin */}
                <Link 
                    to="/admin/login" 
                    className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-700"
                >
                    Admin
                </Link>

            </div>
        </nav>
    );
};

export default Navbar;