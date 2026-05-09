import { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaExternalLinkAlt } from 'react-icons/fa';
import { getAllCertifications, createCertification, deleteCertification } from '../../services/certificationService.js';
import { useToast } from '../../context/ToastContext.jsx'; // Import Hook
import Button from '../ui/Button.jsx';
import Modal from '../ui/Modal.jsx';
import CertificationForm from './CertificationForm.jsx';

const CertificationManager = () => {
    const [certs, setCerts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { showToast } = useToast(); // Lấy hàm showToast ra dùng

    useEffect(() => {
        fetchCerts();
    }, []);

    const fetchCerts = async () => {
        try {
            const data = await getAllCertifications();
            setCerts(data);
        } catch (error) {
            showToast('Không thể tải dữ liệu chứng chỉ!', 'error');
        }
    };

    const handleSave = async (data) => {
        try {
            await createCertification(data);
            fetchCerts();
            setIsModalOpen(false);
            showToast('🎉 Thêm chứng chỉ thành công!', 'success');
        } catch (error) {
            // Lấy message từ server, nếu không có thì dùng câu cứng
            const errorMsg = error.response?.data?.message || 'Lỗi khi lưu chứng chỉ!';
            showToast(errorMsg, 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Xóa bản ghi này?')) {
            try {
                await deleteCertification(id);
                setCerts(certs.filter(c => (c._id || c.id) !== id));
                showToast('🗑️ Đã xóa chứng chỉ thành công!', 'success');
            } catch (error) {
                const errorMsg = error.response?.data?.message || 'Lỗi khi xóa chứng chỉ!';
                showToast(errorMsg, 'error');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Quản lý Chứng chỉ</h2>
                <Button onClick={() => setIsModalOpen(true)} icon={FaPlus}>Thêm mới</Button>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left text-white">
                    <thead className="bg-gray-700/50 text-gray-400">
                        <tr>
                            <th className="p-4">Chứng chỉ</th>
                            <th className="p-4">Tổ chức cấp</th>
                            <th className="p-4">Ngày cấp</th>
                            <th className="p-4">Xác thực</th>
                            <th className="p-4 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {certs.map(cert => (
                            <tr key={cert._id || cert.id} className="hover:bg-gray-700/50">
                                <td className="p-4 font-medium">{cert.title}</td>
                                <td className="p-4 text-gray-400">{cert.issuer}</td>
                                <td className="p-4">{cert.issueDate ? new Date(cert.issueDate).toLocaleDateString('vi-VN') : '-'}</td>
                                <td className="p-4">
                                    {cert.credentialUrl ? (
                                        <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                            <FaExternalLinkAlt size={12} /> Link
                                        </a>
                                    ) : '-'}
                                </td>
                                <td className="p-4 flex justify-end">
                                    <Button variant="danger" size="sm" icon={FaTrash} onClick={() => handleDelete(cert._id || cert.id)}>Xóa</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thêm Chứng chỉ">
                <CertificationForm onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};
export default CertificationManager;