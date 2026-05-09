import { FaExclamationTriangle } from 'react-icons/fa';
import Button from './Button.jsx';

const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = 'Xác nhận thao tác', 
    message = 'Bạn có chắc chắn muốn thực hiện hành động này không?', 
    confirmText = 'Xóa', 
    confirmVariant = 'danger',
    isLoading = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all scale-100 duration-300">
                <div className="flex flex-col items-center text-center">
                    {/* Icon Cảnh báo */}
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-200 dark:border-red-800/50 transition-colors duration-300">
                        <FaExclamationTriangle size={28} />
                    </div>
                    
                    {/* Nội dung */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">{message}</p>
                    
                    {/* Các nút hành động */}
                    <div className="flex gap-3 w-full">
                        <Button 
                            variant="ghost" 
                            onClick={onClose} 
                            disabled={isLoading}
                            className="flex-1 justify-center"
                        >
                            Hủy bỏ
                        </Button>
                        <Button 
                            variant={confirmVariant} 
                            onClick={onConfirm} 
                            disabled={isLoading}
                            className="flex-1 justify-center"
                        >
                            {isLoading ? 'Đang xử lý...' : confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;