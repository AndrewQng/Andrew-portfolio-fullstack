const Select = ({ label, name, value, onChange, options = [], required = false }) => (
    <div className="w-full">
        {label && <label className="block text-sm text-gray-400 mb-1">{label} {required && '*'}</label>}
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none cursor-pointer"
        >
            {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);
export default Select;