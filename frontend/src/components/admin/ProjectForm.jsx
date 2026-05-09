import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import TextArea from '../ui/TextArea.jsx';
import Button from '../ui/Button.jsx';
import { useForm } from '../../hooks/useForm';

const ProjectForm = ({ onSave, onCancel, initialData }) => {
    // Chuyển array thành string để hiển thị trên input
    const initialFormData = initialData ? {
        ...initialData,
        techStack: initialData.techStack?.join(', ') || '',
        gallery: initialData.gallery?.join(', ') || '',
        metrics: initialData.metrics?.join(', ') || ''
    } : {
        title: '',
        slug: '',
        category: 'Game', 
        role: '',
        techStack: '',
        description: { short: '', full: '' },
        thumbnail: '',
        gallery: '',
        metrics: '',
        links: { repo: '', live: '', download: '' },
        status: 'Planned',
        timeline: { start: '', end: '' },
        isFeatured: false
    };

    const { formData, handleChange } = useForm(initialFormData);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Format lại data trước khi save (chuyển string thành array)
        const formattedData = {
            ...formData,
            techStack: formData.techStack ? formData.techStack.split(',').map(s => s.trim()).filter(Boolean) : [],
            gallery: formData.gallery ? formData.gallery.split(',').map(s => s.trim()).filter(Boolean) : [],
            metrics: formData.metrics ? formData.metrics.split(',').map(s => s.trim()).filter(Boolean) : []
        };
        
        onSave(formattedData); 
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thông tin cơ bản */}
            <div className="grid grid-cols-2 gap-4">
                <Input label="Tiêu đề" name="title" value={formData.title} onChange={handleChange} required />
                <Input label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Select 
                    label="Danh mục" name="category" value={formData.category} onChange={handleChange}
                    options={['Game', 'Mobile', 'Web', 'Art']} 
                />
                <Select 
                    label="Trạng thái" name="status" value={formData.status} onChange={handleChange}
                    options={['Planned', 'In Progress', 'Completed']} 
                />
                <Input label="Vai trò (Role)" name="role" value={formData.role} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input type="date" label="Ngày bắt đầu" name="timeline.start" value={formData.timeline?.start?.split('T')[0] || ''} onChange={handleChange} />
                <Input type="date" label="Ngày kết thúc" name="timeline.end" value={formData.timeline?.end?.split('T')[0] || ''} onChange={handleChange} />
            </div>

            {/* Mô tả & Công nghệ */}
            <TextArea label="Mô tả ngắn" name="description.short" value={formData.description?.short} onChange={handleChange} required />
            <TextArea label="Mô tả đầy đủ" name="description.full" value={formData.description?.full} onChange={handleChange} />
            
            <Input label="Tech Stack (cách nhau dấu phẩy)" name="techStack" value={formData.techStack} onChange={handleChange} />

            {/* Media & Links */}
            <Input label="Link ảnh Thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} required />
            <Input label="Gallery (Link ảnh, cách nhau dấu phẩy)" name="gallery" value={formData.gallery} onChange={handleChange} />
            <Input label="Metrics (Thành tựu, cách nhau dấu phẩy)" name="metrics" value={formData.metrics} onChange={handleChange} />

            <div className="border-t border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Liên kết dự án</h4>
                <div className="grid grid-cols-3 gap-4">
                    <Input label="GitHub" name="links.repo" value={formData.links?.repo} onChange={handleChange} />
                    <Input label="Live Demo" name="links.live" value={formData.links?.live} onChange={handleChange} />
                    <Input label="Download (APK/EXE)" name="links.download" value={formData.links?.download} onChange={handleChange} />
                </div>
            </div>

            {/* Khác */}
            <div className="flex items-center gap-3">
                <input 
                    type="checkbox" 
                    id="isFeatured" 
                    name="isFeatured" 
                    checked={formData.isFeatured} 
                    onChange={handleChange} 
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <label htmlFor="isFeatured" className="text-white font-medium">Nổi bật (Featured Project)</label>
            </div>

            <div className="flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-gray-800 py-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <Button variant="ghost" onClick={onCancel} type="button">Hủy bỏ</Button>
                <Button type="submit" variant="primary">Lưu dự án</Button>
            </div>
        </form>
    );
};
export default ProjectForm;
