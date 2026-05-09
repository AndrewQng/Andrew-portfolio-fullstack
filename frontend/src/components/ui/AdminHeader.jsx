const AdminHeader = ({ title, children }) => {
    return (
        <div className="sticky top-0 z-20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md px-6 md:px-8 py-5 border-b border-gray-200/50 dark:border-gray-800/50 flex justify-between items-center transition-all duration-300">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 tracking-tight">
                {title}
            </h2>
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </div>
    );
};

export default AdminHeader;
