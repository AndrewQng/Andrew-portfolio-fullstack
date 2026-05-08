import Input from '../ui/Input.jsx';
import TextArea from '../ui/TextArea.jsx';
import Button from '../ui/Button.jsx';
import { useForm } from '../../hooks/useForm';

const CertificationForm = ({ onSave, onCancel, initialData }) => {
    // Khớp 100% với Schema
    const { formData, handleChange } = useForm(initialData || {
        title: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialUrl: '',
        thumbnail: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    // Hàm chuyển đổi Date từ MongoDB sang format yyyy-mm-dd để hiện trên input type="date"
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input label="Tên chứng chỉ *" name="title" value={formData.title} onChange={handleChange} required />
                <Input label="Tổ chức cấp (Issuer) *" name="issuer" value={formData.issuer} onChange={handleChange} required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <Input type="date" label="Ngày cấp" name="issueDate" value={formatDateForInput(formData.issueDate)} onChange={handleChange} />
                <Input type="date" label="Ngày hết hạn" name="expiryDate" value={formatDateForInput(formData.expiryDate)} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input label="Link kiểm chứng (URL)" name="credentialUrl" value={formData.credentialUrl} onChange={handleChange} />
                <Input label="Link ảnh Thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
            </div>
            
            <TextArea label="Mô tả chi tiết" name="description" value={formData.description} onChange={handleChange} />

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
                <Button variant="ghost" onClick={onCancel}>Hủy</Button>
                <Button type="submit" variant="primary">Lưu Chứng Chỉ</Button>
            </div>
        </form>
    );
};
export default CertificationForm;