const Input = ({ label, name, value, onChange, type = "text", placeholder, required = false }) => (
    <div className="w-full">
        {label && <label className="block text-sm text-gray-400 mb-1">{label} {required && '*'}</label>}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
        />
    </div>
);
export default Input;