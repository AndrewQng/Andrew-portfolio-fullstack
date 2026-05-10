import { useState, useEffect } from 'react';
import { FaSave, FaCloudUploadAlt } from 'react-icons/fa';
import { getUserProfile, updateUserProfile } from '../../services/userService.js';
import { useToast } from '../../context/ToastContext.jsx'; // Import hook Toast
import Input from '../ui/Input.jsx';
import TextArea from '../ui/TextArea.jsx';
import Button from '../ui/Button.jsx';
import SocialLinksInput from '../ui/SocialLinksInput.jsx';
import AdminHeader from '../ui/AdminHeader.jsx';
import ImageCropperModal from '../ui/ImageCropperModal.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorCard from '../ui/ErrorCard.jsx';

const ProfileManager = () => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [avatarLoadError, setAvatarLoadError] = useState(false);

    // Lấy hàm showToast từ Context ra dùng
    const { showToast } = useToast();

    // Quản lý ảnh đại diện và cắt ảnh
    const [rawImage, setRawImage] = useState(null);
    const [isCropOpen, setIsCropOpen] = useState(false);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Giới hạn dung lượng raw ảnh load vào để tránh tràn RAM
        if (file.size > 10 * 1024 * 1024) {
            showToast('Kích thước ảnh tối đa để cắt là 10MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setRawImage(reader.result);
            setIsCropOpen(true);
        };
        reader.readAsDataURL(file);
    };

    const handleCropResult = (croppedBase64) => {
        setAvatarLoadError(false);
        setFormData({ ...formData, avatar: croppedBase64 });
        showToast('Đã cắt và áp dụng ảnh đại diện mới!', 'success');
    };

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUserProfile();
            setFormData(data);
        } catch (err) {
            console.error(err);
            setError({
                status: err.response?.status || 500,
                message: err.response?.data?.message || err.message || 'Lỗi kết nối tới máy chủ'
            });
            showToast('Không thể tải dữ liệu hồ sơ. Vui lòng kiểm tra lại kết nối!', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Xử lý thay đổi các trường cơ bản
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'avatar') {
            setAvatarLoadError(false);
        }
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

    // Xử lý mảng Social Links (Thay đổi, Thêm, Sắp xếp, Xóa qua component con)
    const handleSocialLinksChange = (newLinks) => {
        setFormData(prev => ({ ...prev, socialLinks: newLinks }));
    };

    // Submit lưu dữ liệu
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateUserProfile(formData.id || formData._id, formData);
            // Thay alert thành Toast Success
            showToast('🎉 Đã cập nhật hồ sơ thành công!', 'success');
        } catch (error) {
            // Thay alert thành Toast Error kiểu Hybrid (ưu tiên message từ Backend)
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Lỗi khi lưu dữ liệu. Vui lòng thử lại!';
            showToast(errorMsg, 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingSpinner text="Đang tải dữ liệu hồ sơ..." />;
    if (error) return <ErrorCard statusCode={error.status} message={error.message} onRetry={fetchProfile} />;
    if (!formData) return <ErrorCard statusCode={404} message="Không tìm thấy thông tin hồ sơ người dùng." onRetry={fetchProfile} />;

    return (
        <div className="min-h-full flex flex-col">
            <AdminHeader title="Cập nhật Hồ sơ (Bio, CV, Avatar)">
                <Button onClick={handleSubmit} icon={FaSave} disabled={saving}>
                    {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </Button>
            </AdminHeader>

            <div className="flex-grow p-4 md:p-8 pt-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Khung Thông tin cơ bản */}
                    <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-gray-800/50 shadow-xl space-y-4 transition-colors duration-300">
                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 transition-colors duration-300">1. Thông tin hiển thị</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Họ và Tên" name="fullName" value={formData.fullName} onChange={handleChange} required />
                            <Input label="Tên thương hiệu (Logo Navbar)" name="brandName" value={formData.brandName || ''} onChange={handleChange} placeholder="QuyenDev" />
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
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">
                                    Ảnh đại diện (Upload trực tiếp lên DB hoặc dán URL)
                                </label>

                                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-950/20 border border-gray-200/50 dark:border-gray-800/50">
                                    {/* Upload Button & Preview */}
                                    <div className="relative group cursor-pointer flex-shrink-0">
                                        <input
                                            type="file"
                                            id="avatar-file-input"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileSelect}
                                        />
                                        <label htmlFor="avatar-file-input" className="cursor-pointer block relative">
                                            {formData.avatar && !avatarLoadError ? (
                                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500/50 group-hover:border-blue-500 transition-all duration-300">
                                                    <img
                                                        src={formData.avatar}
                                                        alt="Avatar"
                                                        onError={() => setAvatarLoadError(true)}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] text-white font-bold transition-all duration-300">
                                                        <FaCloudUploadAlt size={20} className="mb-0.5 animate-bounce" />
                                                        ĐỔI ẢNH
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 flex flex-col items-center justify-center text-center p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-all duration-300">
                                                    <FaCloudUploadAlt size={24} className="mb-1" />
                                                    <span className="text-[10px] font-bold">UP ẢNH</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>

                                    {/* Text Input / URL Alternative */}
                                    <div className="flex-1 w-full">
                                        <Input
                                            label="Hoặc dán link ảnh ngoài (Avatar URL)"
                                            name="avatar"
                                            value={formData.avatar}
                                            onChange={handleChange}
                                            placeholder="https://example.com/avatar.jpg"
                                        />
                                        <p className="text-[11px] text-gray-500 mt-1">
                                            Khuyên dùng: Click vào nút hình tròn bên trái để chọn ảnh từ máy, cắt ảnh vuông và nén tự động lưu thẳng vào Database.
                                        </p>
                                    </div>
                                </div>
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
                        <SocialLinksInput
                            value={formData.socialLinks || []}
                            onChange={handleSocialLinksChange}
                        />
                    </div>
                </form>
            </div>
            {/* Modal cắt ảnh đại diện */}
            <ImageCropperModal
                isOpen={isCropOpen}
                imageSrc={rawImage}
                onCrop={handleCropResult}
                onClose={() => { setIsCropOpen(false); setRawImage(null); }}
            />
        </div>
    );
};

export default ProfileManager;