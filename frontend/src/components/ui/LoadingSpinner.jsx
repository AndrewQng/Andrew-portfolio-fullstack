import { motion } from 'framer-motion';

const LoadingSpinner = ({ text = 'Đang tải dữ liệu...', fullPage = false }) => {
    const spinnerElement = (
        <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
            {/* Pulsing and spinning loading ring with modern gradients */}
            <div className="relative w-16 h-16">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-4 border-gray-100/30 dark:border-gray-800/30"
                    style={{
                        borderTopColor: 'var(--color-primary, #3b82f6)',
                        borderRightColor: 'var(--color-secondary, #9333ea)',
                    }}
                />
                <motion.div
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-4 rounded-full bg-blue-500/10 dark:bg-white/5 blur-sm"
                />
            </div>
            
            {/* Loading text with animated ellipsis */}
            <motion.p
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-sm font-semibold text-gray-500 dark:text-gray-400 select-none tracking-wide"
            >
                {text}
            </motion.p>
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 dark:bg-gray-950/70 backdrop-blur-md transition-all duration-300">
                {spinnerElement}
            </div>
        );
    }

    return (
        <div className="w-full min-h-[250px] flex items-center justify-center">
            {spinnerElement}
        </div>
    );
};

export default LoadingSpinner;
