import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import TextArea from '../ui/TextArea.jsx';
import Button from '../ui/Button.jsx';
import { useForm } from '../../hooks/useForm';

const ProjectForm = ({ onSave, onCancel, initialData }) => {
    const { formData, handleChange } = useForm(initialData || {
        title: '',
        slug: '',
        category: 'Game', // Giá trị từ ProjectCategory Enum 
        status: 'COMPLETED',
        description: { short: '', full: '' },
        thumbnail: '',
        links: { repo: '', live: '', download: '' }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Gửi dữ liệu về Manager để gọi ProjectController.create [cite: 14]
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <Input label="Tiêu đề" name="title" value={formData.title} onChange={handleChange} required />
                <Input label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Select 
                    label="Danh mục" name="category" value={formData.category} onChange={handleChange}
                    options={['Game', 'Mobile', 'Web', 'Art']} // Khớp với ProjectCategory [cite: 9]
                />
                <Select 
                    label="Trạng thái" name="status" value={formData.status} onChange={handleChange}
                    options={['PLANNING', 'ONGOING', 'COMPLETED']} // Khớp với ProjectStatus [cite: 9]
                />
            </div>

            <TextArea label="Mô tả ngắn" name="description.short" value={formData.description.short} onChange={handleChange} required />
            <Input label="Link ảnh Thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} required />

            <div className="border-t border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Liên kết dự án</h4>
                <div className="grid grid-cols-3 gap-4">
                    <Input label="GitHub" name="links.repo" value={formData.links.repo} onChange={handleChange} />
                    <Input label="Live Demo" name="links.live" value={formData.links.live} onChange={handleChange} />
                    <Input label="Download (APK)" name="links.download" value={formData.links.download} onChange={handleChange} />
                </div>
            </div>

            <div className="flex justify-end gap-3 sticky bottom-0 bg-gray-800 py-4 border-t border-gray-700">
                <Button variant="ghost" onClick={onCancel}>Hủy bỏ</Button>
                <Button type="submit" variant="primary">Lưu dự án</Button>
            </div>
        </form>
    );
};
export default ProjectForm;