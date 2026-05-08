import { createContext, useContext, useState, useCallback } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

// 1. Tạo Context
const ToastContext = createContext();

// 2. Custom Hook để các file khác gọi cho nhanh
export const useToast = () => useContext(ToastContext);

// 3. Provider bọc ngoài App
export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ message: '', type: 'info', isVisible: false });

    // Hàm gọi Toast (mặc định 3 giây tự tắt)
    const showToast = useCallback((message, type = 'info') => {
        setToast({ message, type, isVisible: true });
        
        setTimeout(() => {
            setToast((prev) => ({ ...prev, isVisible: false }));
        }, 3000);
    }, []);

    const hideToast = () => setToast((prev) => ({ ...prev, isVisible: false }));

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            
            {/* Giao diện Toast (Nổi đè lên mọi thứ - z-[9999]) */}
            <div className={`fixed top-6 right-6 z-[9999] transition-all duration-300 transform pointer-events-none 
                ${toast.isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}
            >
                <div className={`pointer-events-auto flex items-center gap-3 min-w-[280px] max-w-sm px-5 py-4 rounded-xl shadow-2xl border text-white backdrop-blur-md
                    ${toast.type === 'success' ? 'bg-green-950/90 border-green-800' : 
                      toast.type === 'error' ? 'bg-red-950/90 border-red-800' : 
                      'bg-blue-950/90 border-blue-800'}
                `}>
                    {toast.type === 'success' && <FaCheckCircle className="text-green-400 text-xl shrink-0" />}
                    {toast.type === 'error' && <FaExclamationCircle className="text-red-400 text-xl shrink-0" />}
                    {toast.type === 'info' && <FaInfoCircle className="text-blue-400 text-xl shrink-0" />}
                    
                    <span className="flex-grow font-medium text-sm leading-relaxed">{toast.message}</span>
                    
                    <button onClick={hideToast} className="text-gray-400 hover:text-white transition-colors shrink-0">
                        <FaTimes />
                    </button>
                </div>
            </div>
        </ToastContext.Provider>
    );
};