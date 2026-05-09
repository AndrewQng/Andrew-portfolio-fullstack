import { FaTimes } from 'react-icons/fa';
import Button from './Button.jsx';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col transition-colors duration-300">
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{title}</h3>
                    <Button variant="ghost" onClick={onClose} className="!p-2">
                        <FaTimes size={20} className="text-gray-500 dark:text-gray-400" />
                    </Button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
