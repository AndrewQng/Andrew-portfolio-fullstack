const Select = ({ label, name, value, onChange, options = [], required = false }) => (
    <div className="w-full">
        {label && <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">{label} {required && '*'}</label>}
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:border-blue-500 outline-none cursor-pointer transition-colors duration-300"
        >
            {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);
export default Select;