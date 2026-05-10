import { useState, useEffect } from 'react';
import { getAllSkills, deleteSkill, createSkill, updateSkill } from '../../services/skillService.js';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext.jsx';
import Button from '../ui/Button.jsx';
import ConfirmModal from '../ui/ConfirmModal.jsx';
import Modal from '../ui/Modal.jsx';
import SkillForm from './SkillForm.jsx';
import AdminHeader from '../ui/AdminHeader.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorCard from '../ui/ErrorCard.jsx';

const SkillManager = () => {
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { showToast } = useToast();

    // Quản lý form
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    // Quản lý modal xác nhận xóa
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        skillId: null,
        isDeleting: false
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAllSkills();
            const skillsArray = Array.isArray(data) ? data : (data.data || []);
            const sortedSkills = [...skillsArray].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setSkills(sortedSkills);
        } catch (err) {
            console.error(err);
            setError({
                status: err.response?.status || 500,
                message: err.response?.data?.message || err.message || 'Lỗi kết nối tới máy chủ'
            });
            showToast('Không thể tải dữ liệu kỹ năng!', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const triggerDelete = (id) => {
        setConfirmModal({ isOpen: true, skillId: id, isDeleting: false });
    };

    const executeDelete = async () => {
        if (!confirmModal.skillId) return;
        
        setConfirmModal(prev => ({ ...prev, isDeleting: true }));
        
        try {
            await deleteSkill(confirmModal.skillId);
            setSkills(skills.filter(s => (s.id || s._id) !== confirmModal.skillId));
            showToast('🗑️ Đã xóa kỹ năng thành công!', 'success');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Lỗi khi xóa kỹ năng!';
            showToast(errorMsg, 'error');
        } finally {
            setConfirmModal({ isOpen: false, skillId: null, isDeleting: false });
        }
    };

    const handleOpenForm = (skill = null) => {
        setEditingSkill(skill);
        setIsFormOpen(true);
    };

    const handleSaveSkill = async (skillData) => {
        try {
            if (editingSkill) {
                // Sửa
                const updatedSkill = await updateSkill(editingSkill._id || editingSkill.id, skillData);
                showToast('Cập nhật kỹ năng thành công!', 'success');
            } else {
                // Thêm mới
                const newSkill = await createSkill(skillData);
                showToast('Thêm kỹ năng thành công!', 'success');
            }
            setIsFormOpen(false);
            setEditingSkill(null);
            fetchSkills(); // Tải lại danh sách
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Lỗi khi lưu kỹ năng!';
            showToast(errorMsg, 'error');
        }
    };

    return (
        <div className="min-h-full flex flex-col">
            {/* ... Modal wrapper ... */}
            <Modal 
                isOpen={isFormOpen} 
                onClose={() => { setIsFormOpen(false); setEditingSkill(null); }}
                title={editingSkill ? 'Chỉnh sửa Kỹ năng' : 'Thêm Kỹ năng mới'}
            >
                <SkillForm 
                    initialData={editingSkill} 
                    onSave={handleSaveSkill} 
                    onCancel={() => { setIsFormOpen(false); setEditingSkill(null); }} 
                />
            </Modal>

            <AdminHeader title="Quản lý Kỹ năng">
                <Button onClick={() => handleOpenForm(null)} icon={FaPlus}>
                    Thêm Kỹ năng
                </Button>
            </AdminHeader>

            <div className="flex-grow p-4 md:p-8 pt-2">
                {isLoading && skills.length === 0 ? (
                    <LoadingSpinner text="Đang tải danh sách kỹ năng..." />
                ) : error ? (
                    <ErrorCard statusCode={error.status} message={error.message} onRetry={fetchSkills} />
                ) : (
                    <>
                        {/* View cho Mobile (Cards) */}
                        <div className="md:hidden space-y-4">
                            {skills.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">Chưa có kỹ năng nào.</div>
                            ) : (
                                skills.map((skill) => (
                                    <div key={skill._id || skill.id} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-5 rounded-2xl border border-white/50 dark:border-gray-800/50 shadow-lg flex flex-col gap-3 transition-colors duration-300">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                                                {skill.iconUrl && (
                                                    <img src={skill.iconUrl} alt={skill.name} className="w-6 h-6 object-contain" />
                                                )}
                                                {skill.name}
                                            </h3>
                                            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs px-2 py-1 rounded border border-purple-200 dark:border-purple-800">
                                                {skill.category}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Thứ tự: <span className="font-bold">{skill.displayOrder || 0}</span></span>
                                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-2 py-1 rounded border border-blue-200 dark:border-blue-800">
                                                {skill.level}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 justify-end mt-2">
                                            <Button variant="outline" size="sm" icon={FaEdit} onClick={() => handleOpenForm(skill)}>Sửa</Button>
                                            <Button variant="danger" size="sm" icon={FaTrash} onClick={() => triggerDelete(skill._id || skill.id)}>Xóa</Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* View cho Desktop (Table) */}
                        <div className="hidden md:block bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-800/50 shadow-2xl overflow-hidden transition-colors duration-300">
                            <table className="w-full text-left text-gray-900 dark:text-white">
                                <thead className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-600 dark:text-gray-400 border-b border-white/50 dark:border-gray-800/50 transition-colors duration-300">
                                    <tr>
                                        <th className="p-4">Kỹ năng</th>
                                        <th className="p-4">Danh mục</th>
                                        <th className="p-4">Mức độ</th>
                                        <th className="p-4 text-center">Thứ tự</th>
                                        <th className="p-4 text-right">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-300">
                                    {skills.length === 0 ? (
                                        <tr><td colSpan="5" className="p-8 text-center text-gray-500">Chưa có kỹ năng nào.</td></tr>
                                    ) : (
                                        skills.map((skill) => (
                                            <tr key={skill._id || skill.id} className="hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-300">
                                                <td className="p-4 font-medium flex items-center gap-3">
                                                    {skill.iconUrl && (
                                                        <img src={skill.iconUrl} alt={skill.name} className="w-6 h-6 object-contain" />
                                                    )}
                                                    {skill.name}
                                                </td>
                                                <td className="p-4">
                                                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 transition-colors duration-300">
                                                        {skill.category}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 transition-colors duration-300">
                                                        {skill.level}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-center">{skill.displayOrder || 0}</td>
                                                <td className="p-4 flex justify-end gap-3">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        icon={FaEdit} 
                                                        onClick={() => handleOpenForm(skill)}
                                                    >
                                                        Sửa
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        size="sm" 
                                                        icon={FaTrash}
                                                        onClick={() => triggerDelete(skill._id || skill.id)}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                <ConfirmModal 
                    isOpen={confirmModal.isOpen}
                    isLoading={confirmModal.isDeleting}
                    title="Xóa Kỹ năng"
                    message="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa kỹ năng này?"
                    confirmText="Vâng, Xóa ngay"
                    onClose={() => setConfirmModal({ isOpen: false, skillId: null, isDeleting: false })}
                    onConfirm={executeDelete}
                />
            </div>
        </div>
    );
};

export default SkillManager;
