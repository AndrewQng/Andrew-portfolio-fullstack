import { useState } from 'react';

export const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, type, checked, value: targetValue } = e.target;
        const value = type === 'checkbox' ? checked : targetValue;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const resetForm = () => setFormData(initialState);

    return { formData, setFormData, handleChange, resetForm };
};