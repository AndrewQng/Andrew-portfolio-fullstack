const TextArea = ({ label, name, value, onChange, rows = 4, placeholder, required = false }) => (
    <div className="w-full">
        {label && <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">{label} {required && '*'}</label>}
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            placeholder={placeholder}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none transition-all duration-300"
        />
    </div>
);

export default TextArea;