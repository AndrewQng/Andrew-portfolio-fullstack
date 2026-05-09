import { motion } from 'framer-motion';
import { FaExclamationCircle, FaRedoAlt } from 'react-icons/fa';
import Button from './Button.jsx';

const ErrorCard = ({ 
    statusCode = 500, 
    message = 'Đã xảy ra lỗi không xác định trên hệ thống.', 
    onRetry,
    fullPage = false
}) => {
    // Generate a user-friendly error details text based on status code
    const getErrorText = () => {
        if (statusCode === 404) return 'Không tìm thấy tài nguyên (Not Found)';
        if (statusCode === 401) return 'Không có quyền truy cập (Unauthorized)';
        if (statusCode === 403) return 'Bị từ chối truy cập (Forbidden)';
        if (statusCode === 503) return 'Dịch vụ tạm thời không khả dụng (Service Unavailable)';
        return 'Lỗi kết nối máy chủ (Internal Server Error)';
    };

    const errorElement = (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-md mx-auto p-8 rounded-3xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-red-200/50 dark:border-red-900/30 shadow-2xl shadow-red-500/5 flex flex-col items-center text-center overflow-hidden transition-all duration-300"
        >
            {/* Huge watermarked status code in background */}
            <div className="absolute top-[-30px] right-[-20px] text-[110px] font-black text-red-500/5 dark:text-red-500/10 pointer-events-none select-none select-none tracking-tighter">
                {statusCode}
            </div>

            {/* Glowing animated error icon wrapper */}
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30 flex items-center justify-center mb-5 relative">
                <FaExclamationCircle size={28} />
                <span className="absolute inset-0 rounded-full bg-red-500/10 dark:bg-red-500/20 animate-ping opacity-60" />
            </div>

            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500/70 dark:text-red-400/80 mb-1.5">
                MÃ LỖI: {statusCode}
            </span>
            
            <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight mb-2.5">
                {getErrorText()}
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6 max-w-xs">
                {message}
            </p>

            {onRetry && (
                <Button 
                    variant="danger" 
                    onClick={onRetry} 
                    className="flex items-center gap-2 px-5 py-2 text-xs font-bold shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all rounded-xl"
                >
                    <FaRedoAlt size={11} /> Thử lại ngay
                </Button>
            )}
        </motion.div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-all duration-300">
                {errorElement}
            </div>
        );
    }

    return (
        <div className="w-full min-h-[300px] flex items-center justify-center p-4">
            {errorElement}
        </div>
    );
};

export default ErrorCard;
