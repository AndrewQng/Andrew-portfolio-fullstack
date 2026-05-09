import { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { getUserProfile, updateUserProfile } from '../../services/userService.js';
import { useToast } from '../../context/ToastContext.jsx'; // Import hook Toast
import Input from '../ui/Input.jsx';
import TextArea from '../ui/TextArea.jsx';
import Button from '../ui/Button.jsx';

const ProfileManager = () => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Lấy hàm showToast từ Context ra dùng
    const { showToast } = useToast();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setFormData(data);
            } catch (error) {
                // Thay console.error bằng Toast xịn
                showToast('Không thể tải dữ liệu hồ sơ. Vui lòng kiểm tra lại kết nối!', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [showToast]);

    // Xử lý thay đổi các trường cơ bản
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý thay đổi object Bio (short, full)
    const handleBioChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            bio: { ...prev.bio, [name]: value }
        }));
    };

    // Xử lý mảng Social Links (Thêm, Sửa, Xóa)
    const handleSocialChange = (index, field, value) => {
        const newSocials = [...(formData.socialLinks || [])];
        newSocials[index][field] = value;
        setFormData(prev => ({ ...prev, socialLinks: newSocials }));
    };

    const addSocialLink = () => {
        setFormData(prev => ({
            ...prev,
            socialLinks: [...(prev.socialLinks || []), { platform: '', url: '', icon: '' }]
        }));
    };

    const removeSocialLink = (index) => {
        const newSocials = [...(formData.socialLinks || [])];
        newSocials.splice(index, 1);
        setFormData(prev => ({ ...prev, socialLinks: newSocials }));
    };

    // Submit lưu dữ liệu
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateUserProfile(formData._id, formData);
            // Thay alert thành Toast Success
            showToast('🎉 Đã cập nhật hồ sơ thành công!', 'success');
        } catch (error) {
            // Thay alert thành Toast Error kiểu Hybrid (ưu tiên message từ Backend)
            const errorMsg = error.response?.data?.message || 'Lỗi khi lưu dữ liệu. Vui lòng thử lại!';
            showToast(errorMsg, 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-gray-400">Đang tải dữ liệu hồ sơ...</div>;
    if (!formData) return <div className="text-red-400">Không tìm thấy thông tin.</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Cập nhật Hồ sơ (Bio, CV, Avatar)</h2>
                <Button onClick={handleSubmit} icon={FaSave} disabled={saving}>
                    {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Khung Thông tin cơ bản */}
                <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-gray-800/50 shadow-xl space-y-4 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 transition-colors duration-300">1. Thông tin hiển thị</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Họ và Tên" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        <Input label="Chức danh (Job Title)" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
                        <Input label="Email liên hệ" name="email" value={formData.email} onChange={handleChange} required />
                        <Input label="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <Input label="Địa chỉ" name="address" value={formData.address} onChange={handleChange} />
                </div>

                {/* Khung Tài nguyên (Ảnh & CV) */}
                <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-gray-800/50 shadow-xl space-y-4 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 transition-colors duration-300">2. Tài nguyên đa phương tiện</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Input label="Link Ảnh đại diện (Avatar URL)" name="avatar" value={formData.avatar} onChange={handleChange} />
                            {formData.avatar && (
                                <img src={formData.avatar} alt="Preview Avatar" className="w-24 h-24 object-cover rounded-full border-2 border-gray-600" />
                            )}
                        </div>
                        <div>
                            <Input label="Link Tải CV (PDF URL)" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} />
                            <p className="text-xs text-gray-500 mt-1">Upload CV lên Google Drive hoặc host tĩnh rồi dán link vào đây.</p>
                        </div>
                    </div>
                </div>

                {/* Khung Giới thiệu (Bio) */}
                <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-gray-800/50 shadow-xl space-y-4 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 transition-colors duration-300">3. Giới thiệu bản thân</h3>
                    <TextArea label="Mô tả ngắn (Hiển thị trang chủ - Tối đa 200 ký tự)" name="short" value={formData.bio?.short} onChange={handleBioChange} rows={2} required />
                    <TextArea label="Mô tả chi tiết (Hiển thị trang About - Hỗ trợ Markdown)" name="full" value={formData.bio?.full} onChange={handleBioChange} rows={6} />
                </div>

                {/* Khung Mạng xã hội */}
                <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-gray-800/50 shadow-xl space-y-4 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 transition-colors duration-300">
                        <h3 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 transition-colors duration-300">4. Mạng xã hội</h3>
                        <Button type="button" onClick={addSocialLink} variant="outline" size="sm" icon={FaPlus}>Thêm Link</Button>
                    </div>
                    
                    {formData.socialLinks?.map((social, index) => (
                        <div key={index} className="flex gap-4 items-end bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-white/50 dark:border-gray-700/50 transition-colors duration-300">
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Nền tảng (vd: GitHub, Facebook)" value={social.platform} onChange={(e) => handleSocialChange(index, 'platform', e.target.value)} required />
                                <Input label="Đường dẫn (URL)" value={social.url} onChange={(e) => handleSocialChange(index, 'url', e.target.value)} required />
                            </div>
                            <Button type="button" onClick={() => removeSocialLink(index)} variant="danger" icon={FaTrash} className="mb-1" />
                        </div>
                    ))}
                    {(!formData.socialLinks || formData.socialLinks.length === 0) && (
                        <p className="text-gray-500 text-sm">Chưa có liên kết mạng xã hội nào.</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProfileManager;