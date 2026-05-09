import { useState, useEffect } from 'react';
import { getAllProjects, deleteProject, createProject, updateProject } from '../../services/projectService.js';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext.jsx';
import Button from '../ui/Button.jsx';
import ConfirmModal from '../ui/ConfirmModal.jsx'; 
import Modal from '../ui/Modal.jsx';
import ProjectForm from './ProjectForm.jsx';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showToast } = useToast();

    // 2. Thêm State quản lý cái Modal Xác Nhận
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        projectId: null,
        isDeleting: false
    });

    // State quản lý Form
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const data = await getAllProjects();
            setProjects(data);
        } catch (error) {
            showToast('Không thể tải dữ liệu dự án!', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Hàm kích hoạt mở Modal (thay vì gọi window.confirm)
    const triggerDelete = (id) => {
        setConfirmModal({ isOpen: true, projectId: id, isDeleting: false });
    };

    // 4. Hàm thực thi việc Xóa khi user bấm nút "Xóa" trên Modal
    const executeDelete = async () => {
        if (!confirmModal.projectId) return;
        
        setConfirmModal(prev => ({ ...prev, isDeleting: true })); // Vô hiệu hóa nút trong lúc chờ
        
        try {
            await deleteProject(confirmModal.projectId);
            setProjects(projects.filter(p => (p.id || p._id) !== confirmModal.projectId));
            showToast('🗑️ Đã xóa dự án thành công!', 'success');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Lỗi khi xóa dự án!';
            showToast(errorMsg, 'error');
        } finally {
            // Xóa xong thì đóng Modal lại
            setConfirmModal({ isOpen: false, projectId: null, isDeleting: false });
        }
    };

    const handleOpenForm = (project = null) => {
        setEditingProject(project);
        setIsFormOpen(true);
    };

    const handleSaveProject = async (projectData) => {
        try {
            if (editingProject) {
                await updateProject(editingProject._id || editingProject.id, projectData);
                showToast('Cập nhật Dự án thành công!', 'success');
            } else {
                await createProject(projectData);
                showToast('Thêm Dự án thành công!', 'success');
            }
            setIsFormOpen(false);
            setEditingProject(null);
            fetchProjects(); // Tải lại danh sách
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Lỗi khi lưu Dự án!';
            showToast(errorMsg, 'error');
        }
    };

    return (
        <div>
            <Modal 
                isOpen={isFormOpen} 
                onClose={() => { setIsFormOpen(false); setEditingProject(null); }}
                title={editingProject ? 'Chỉnh sửa Dự án' : 'Thêm Dự án mới'}
            >
                <ProjectForm 
                    initialData={editingProject} 
                    onSave={handleSaveProject} 
                    onCancel={() => { setIsFormOpen(false); setEditingProject(null); }} 
                />
            </Modal>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Quản lý Dự án</h2>
                <Button onClick={() => handleOpenForm(null)} icon={FaPlus}>
                    Thêm Dự án
                </Button>
            </div>

            {/* View cho Mobile (Cards) */}
            <div className="md:hidden space-y-4">
                {isLoading ? (
                    <div className="text-center text-gray-500 py-8">Đang tải dữ liệu...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">Chưa có dự án nào.</div>
                ) : (
                    projects.map((project) => (
                        <div key={project._id || project.id} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-5 rounded-2xl border border-white/50 dark:border-gray-800/50 shadow-lg flex flex-col gap-3 transition-colors duration-300">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{project.title}</h3>
                                <span className="text-sm font-medium text-green-600 dark:text-green-400">{project.status}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                                    {project.category}
                                </span>
                            </div>
                            <div className="flex gap-2 justify-end mt-2">
                                <Button variant="outline" size="sm" icon={FaEdit} onClick={() => handleOpenForm(project)}>Sửa</Button>
                                <Button variant="danger" size="sm" icon={FaTrash} onClick={() => triggerDelete(project._id || project.id)}>Xóa</Button>
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
                            <th className="p-4">Tên dự án</th>
                            <th className="p-4">Danh mục</th>
                            <th className="p-4">Trạng thái</th>
                            <th className="p-4 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-300">
                        {isLoading ? (
                            <tr><td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400">Đang tải dữ liệu...</td></tr>
                        ) : projects.length === 0 ? (
                            <tr><td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-500">Chưa có dự án nào.</td></tr>
                        ) : (
                            projects.map((project) => (
                                <tr key={project._id || project.id} className="hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-300">
                                    <td className="p-4 font-medium">{project.title}</td>
                                    <td className="p-4">
                                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 transition-colors duration-300">
                                            {project.category}
                                        </span>
                                    </td>
                                    <td className="p-4"><span className="text-green-600 dark:text-green-400 text-sm transition-colors duration-300">{project.status}</span></td>
                                    <td className="p-4 flex justify-end gap-3">
                                        <Button variant="outline" size="sm" icon={FaEdit} onClick={() => handleOpenForm(project)}>
                                            Sửa
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            icon={FaTrash}
                                            onClick={() => triggerDelete(project._id || project.id)}
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

            {/* 5. Gắn ConfirmModal xuống dưới cùng */}
            <ConfirmModal 
                isOpen={confirmModal.isOpen}
                isLoading={confirmModal.isDeleting}
                title="Xóa Dự án"
                message="Hành động này không thể hoàn tác. Dự án này sẽ bị xóa vĩnh viễn khỏi Database. Bạn có chắc chắn không?"
                confirmText="Vâng, Xóa ngay"
                onClose={() => setConfirmModal({ isOpen: false, projectId: null, isDeleting: false })}
                onConfirm={executeDelete}
            />
        </div>
    );
};

export default ProjectManager;