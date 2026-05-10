import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MouseEffect = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    if (isMobile) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Vòng sáng chính đi theo chuột */}
            <motion.div
                animate={{
                    x: mousePosition.x - 200,
                    y: mousePosition.y - 200,
                }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
                className="absolute w-[400px] h-[400px] rounded-full opacity-30 dark:opacity-20 blur-[100px]"
                style={{ background: 'var(--color-primary)' }}
            />
            {/* Vòng sáng phụ đi trễ hơn một chút tạo hiệu ứng mượt */}
            <motion.div
                animate={{
                    x: mousePosition.x - 150,
                    y: mousePosition.y - 150,
                }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
                className="absolute w-[300px] h-[300px] rounded-full opacity-30 dark:opacity-20 blur-[80px]"
                style={{ background: 'var(--color-secondary)' }}
            />
        </div>
    );
};

export default MouseEffect;
