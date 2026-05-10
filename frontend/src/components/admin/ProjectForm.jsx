import { useState, useEffect } from 'react';
import { getAllSkills } from '../../services/skillService';
import Input from '../ui/Input.jsx';
import Select from '../ui/Select.jsx';
import TextArea from '../ui/TextArea.jsx';
import Button from '../ui/Button.jsx';
import { useForm } from '../../hooks/useForm';

const ProjectForm = ({ onSave, onCancel, initialData }) => {
    const [allSkills, setAllSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await getAllSkills();
                setAllSkills(data);
            } catch (err) {
                console.error('Lỗi nạp kỹ năng:', err);
            }
        };
        fetchSkills();
    }, []);

    // Chuyển array thành string hoặc cấu trúc phù hợp để hiển thị trên input
    const initialFormData = initialData ? {
        ...initialData,
        techStack: initialData.techStack?.map(s => s.id || s._id || s) || [],
        gallery: initialData.gallery?.map(img => typeof img === 'object' ? img.url : img).join(', ') || '',
        metrics: initialData.metrics?.join(', ') || ''
    } : {
        title: '',
        slug: '',
        category: 'Game', 
        role: '',
        techStack: [],
        description: { short: '', full: '' },
        thumbnail: '',
        gallery: '',
        metrics: '',
        links: { repo: '', live: '', download: '' },
        status: 'Planned',
        timeline: { start: '', end: '' },
        isFeatured: false
    };

    const { formData, setFormData, handleChange } = useForm(initialFormData);

    const handleThumbnailSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('Kích thước ảnh tối đa là 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                thumbnail: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSkillToggle = (skillId) => {
        const currentStack = Array.isArray(formData.techStack) ? formData.techStack : [];
        const isSelected = currentStack.includes(skillId);
        
        const nextStack = isSelected 
            ? currentStack.filter(id => id !== skillId)
            : [...currentStack, skillId];
            
        setFormData(prev => ({
            ...prev,
            techStack: nextStack
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Format lại data đúng chuẩn đầu vào của Backend (BE)
        const formattedData = {
            ...formData,
            techStack: Array.isArray(formData.techStack) ? formData.techStack : [],
            gallery: formData.gallery ? formData.gallery.split(',').map(s => s.trim()).filter(Boolean).map(url => ({ url, type: 'image' })) : [],
            metrics: formData.metrics ? formData.metrics.split(',').map(s => s.trim()).filter(Boolean) : []
        };
        
        onSave(formattedData); 
    };

    // Nhóm các kỹ năng theo danh mục để hiển thị trực quan
    const groupedSkills = allSkills.reduce((acc, skill) => {
        const cat = skill.category || 'Khác';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

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
            
            {/* Tech Stack Selection */}
            <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">
                    Công nghệ sử dụng (Tech Stack)
                </label>
                <div className="space-y-4 max-h-60 overflow-y-auto p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/20">
                    {Object.keys(groupedSkills).length === 0 ? (
                        <div className="text-xs text-gray-500 text-center py-4">Đang tải danh sách kỹ năng hoặc chưa có kỹ năng nào...</div>
                    ) : (
                        Object.entries(groupedSkills).map(([category, skills]) => (
                            <div key={category} className="space-y-1.5">
                                <h5 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{category}</h5>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => {
                                        const isSelected = Array.isArray(formData.techStack) && formData.techStack.includes(skill.id || skill._id);
                                        return (
                                            <button
                                                type="button"
                                                key={skill.id || skill._id}
                                                onClick={() => handleSkillToggle(skill.id || skill._id)}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 flex items-center gap-1.5 ${
                                                    isSelected
                                                        ? 'bg-blue-100 border-blue-400 text-blue-800 dark:bg-blue-900/40 dark:border-blue-500 dark:text-blue-300 shadow-sm shadow-blue-500/10'
                                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 dark:bg-gray-900/40 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700'
                                                }`}
                                            >
                                                {skill.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <p className="text-[11px] text-gray-500">
                    Click vào các thẻ kỹ năng ở trên để thêm/bỏ bớt công nghệ trong dự án của bạn (đầu ra đồng nhất đúng chuẩn ID với Database!).
                </p>
            </div>

            {/* Media & Links */}
            <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4 transition-colors duration-300">
                <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Ảnh Thumbnail Dự Án (PNG/JPG)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-950/20 border border-gray-200/50 dark:border-gray-800/50">
                    {/* Upload button & preview */}
                    <div className="relative group cursor-pointer flex-shrink-0">
                        <input
                            type="file"
                            id="project-thumbnail-input"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            className="hidden"
                            onChange={handleThumbnailSelect}
                        />
                        <label htmlFor="project-thumbnail-input" className="cursor-pointer block relative">
                            {formData.thumbnail ? (
                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-500/50 group-hover:border-blue-500 transition-all duration-300">
                                    <img
                                        src={formData.thumbnail}
                                        alt="Thumbnail Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] text-white font-bold transition-all duration-300">
                                        ĐỔI ẢNH
                                    </div>
                                </div>
                            ) : (
                                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 flex flex-col items-center justify-center text-center p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-all duration-300">
                                    <span className="text-[10px] font-bold">UP ẢNH (PNG/JPG)</span>
                                </div>
                            )}
                        </label>
                    </div>

                    <div className="flex-1 w-full">
                        <Input 
                            label="Hoặc dán URL ảnh Thumbnail" 
                            name="thumbnail" 
                            value={formData.thumbnail} 
                            onChange={handleChange} 
                            required 
                        />
                        <p className="text-[11px] text-gray-500 mt-1">
                            Chọn trực tiếp tệp ảnh PNG/JPG từ máy tính (tự động chuyển thành Base64) hoặc nhập link ảnh ngoài.
                        </p>
                    </div>
                </div>
            </div>

            <Input label="Gallery (Link ảnh, cách nhau dấu phẩy)" name="gallery" value={formData.gallery} onChange={handleChange} />
            <Input label="Metrics (Thành tựu, cách nhau dấu phẩy)" name="metrics" value={formData.metrics} onChange={handleChange} />

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-gray-450 dark:text-gray-500 mb-4 uppercase">Liên kết dự án</h4>
                <div className="grid grid-cols-3 gap-4">
                    <Input label="GitHub" name="links.repo" value={formData.links?.repo} onChange={handleChange} />
                    <Input label="Live Demo" name="links.live" value={formData.links?.live} onChange={handleChange} />
                    <Input label="Download (APK/EXE)" name="links.download" value={formData.links?.download} onChange={handleChange} />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <input 
                    type="checkbox" 
                    id="isFeatured" 
                    name="isFeatured" 
                    checked={formData.isFeatured} 
                    onChange={handleChange} 
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <label htmlFor="isFeatured" className="text-gray-900 dark:text-white font-medium">Nổi bật (Featured Project)</label>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8 transition-colors duration-300">
                <Button variant="ghost" onClick={onCancel} type="button">Hủy bỏ</Button>
                <Button type="submit" variant="primary">Lưu dự án</Button>
            </div>
        </form>
    );
};
export default ProjectForm;
