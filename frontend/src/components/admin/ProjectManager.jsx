import { useState, useEffect } from 'react';
import { getAllProjects, deleteProject } from '../../services/projectService';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Lấy dữ liệu từ Backend khi component load
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const data = await getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error('Lỗi khi tải danh sách dự án:', error);
            alert('Không thể tải dữ liệu!');
        } finally {
            setIsLoading(false);
        }
    };

    // Hàm gọi API xóa dự án
    const handleDelete = async (id) => {
        if (window.confirm('Ông có chắc chắn muốn xóa dự án này?')) {
            try {
                await deleteProject(id);
                // Xóa xong thì load lại danh sách hoặc lọc bỏ phần tử đã xóa
                setProjects(projects.filter(p => p.id !== id && p._id !== id));
                alert('Xóa thành công!');
            } catch (error) {
                console.error('Lỗi khi xóa:', error);
                alert('Xóa thất bại!');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Quản lý Dự án</h2>
                <button 
                    // Chỗ này sau sẽ mở Modal Form thêm mới
                    onClick={() => alert('Mở form thêm mới (Chuẩn bị làm)')} 
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    + Thêm Dự án mới
                </button>
            </div>

            {/* Bảng danh sách dự án */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-700/50 text-gray-400 border-b border-gray-700">
                        <tr>
                            <th className="p-4">Tên dự án</th>
                            <th className="p-4">Danh mục</th>
                            <th className="p-4">Trạng thái</th>
                            <th className="p-4 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {isLoading ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-400">Đang tải dữ liệu...</td>
                            </tr>
                        ) : projects.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                    Chưa có dự án nào. Hãy bấm thêm mới!
                                </td>
                            </tr>
                        ) : (
                            projects.map((project) => (
                                <tr key={project._id || project.id} className="hover:bg-gray-700/50">
                                    <td className="p-4 font-medium text-white">{project.title}</td>
                                    <td className="p-4">
                                        <span className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-800">
                                            {project.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {/* Hiển thị status tùy theo Enum ProjectStatus */}
                                        <span className="text-green-400 text-sm">{project.status}</span>
                                    </td>
                                    <td className="p-4 flex justify-end gap-3">
                                        <button className="text-yellow-400 hover:text-yellow-300">
                                            Sửa
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(project._id || project.id)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectManager;