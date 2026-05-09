import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import Button from '../ui/Button.jsx';
import { useForm } from '../../hooks/useForm';

const SkillForm = ({ onSave, onCancel, initialData }) => {
    const { formData, handleChange } = useForm(initialData || {
        name: '',
        category: 'Frontend', // Khớp với SkillCategory
        level: 'Intermediate', // Khớp với SkillLevel
        iconUrl: '',
        displayOrder: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            displayOrder: Number(formData.displayOrder) || 0
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <Input label="Tên kỹ năng" name="name" value={formData.name} onChange={handleChange} required />
                <Input label="Icon URL (SVG/Image link)" name="iconUrl" value={formData.iconUrl} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Select 
                    label="Danh mục" name="category" value={formData.category} onChange={handleChange}
                    options={['Frontend', 'Backend', 'Game Dev', 'Mobile', 'Tools', 'Language']} 
                />
                <Select 
                    label="Mức độ thành thạo" name="level" value={formData.level} onChange={handleChange}
                    options={['Beginner', 'Intermediate', 'Advanced', 'Expert']} 
                />
            </div>

            <Input 
                type="number" 
                label="Thứ tự hiển thị" 
                name="displayOrder" 
                value={formData.displayOrder} 
                onChange={handleChange} 
            />

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8 transition-colors duration-300">
                <Button variant="ghost" onClick={onCancel} type="button">Hủy bỏ</Button>
                <Button type="submit" variant="primary">Lưu kỹ năng</Button>
            </div>
        </form>
    );
};
export default SkillForm;