const TextArea = ({ label, name, value, onChange, rows = 4, placeholder, required = false }) => (
    <div className="w-full">
        {label && <label className="block text-sm text-gray-400 mb-1">{label} {required && '*'}</label>}
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            placeholder={placeholder}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none resize-none transition-all"
        />
    </div>
);

export default TextArea;