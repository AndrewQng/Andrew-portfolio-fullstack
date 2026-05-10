import { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaExternalLinkAlt, FaEdit } from 'react-icons/fa';
import { getAllCertifications, createCertification, deleteCertification, updateCertification } from '../../services/certificationService.js';
import { useToast } from '../../context/ToastContext.jsx';
import Button from '../ui/Button.jsx';
import Modal from '../ui/Modal.jsx';
import ConfirmModal from '../ui/ConfirmModal.jsx';
import CertificationForm from './CertificationForm.jsx';
import AdminHeader from '../ui/AdminHeader.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import ErrorCard from '../ui/ErrorCard.jsx';

const CertificationManager = () => {
    const [certs, setCerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { showToast } = useToast();

    // Form
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCert, setEditingCert] = useState(null);

    // Delete Modal
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        certId: null,
        isDeleting: false
    });

    useEffect(() => {
        fetchCerts();
    }, []);

    const fetchCerts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAllCertifications();
            const certsArray = Array.isArray(data) ? data : (data.data || []);
            setCerts(certsArray);
        } catch (err) {
            console.error(err);
            setError({
                status: err.response?.status || 500,
                message: err.response?.data?.message || err.message || 'Lỗi kết nối tới máy chủ'
            });
            showToast('Không thể tải dữ liệu chứng chỉ!', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenForm = (cert = null) => {
        setEditingCert(cert);
        setIsFormOpen(true);
    };

    const handleSave = async (data) => {
        try {
            if (editingCert) {
                await updateCertification(editingCert._id || editingCert.id, data);
                showToast('Cập nhật chứng chỉ thành công!', 'success');
            } else {
                await createCertification(data);
                showToast('🎉 Thêm chứng chỉ thành công!', 'success');
            }
            setIsFormOpen(false);
            setEditingCert(null);
            fetchCerts();
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Lỗi khi lưu chứng chỉ!';
            showToast(errorMsg, 'error');
        }
    };

    const triggerDelete = (id) => {
        setConfirmModal({ isOpen: true, certId: id, isDeleting: false });
    };

    const executeDelete = async () => {
        if (!confirmModal.certId) return;
        setConfirmModal(prev => ({ ...prev, isDeleting: true }));
        try {
            await deleteCertification(confirmModal.certId);
            setCerts(certs.filter(c => (c._id || c.id) !== confirmModal.certId));
            showToast('🗑️ Đã xóa chứng chỉ thành công!', 'success');
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Lỗi khi xóa chứng chỉ!';
            showToast(errorMsg, 'error');
        } finally {
            setConfirmModal({ isOpen: false, certId: null, isDeleting: false });
        }
    };

    return (
        <div className="min-h-full flex flex-col">
            <Modal 
                isOpen={isFormOpen} 
                onClose={() => { setIsFormOpen(false); setEditingCert(null); }} 
                title={editingCert ? 'Chỉnh sửa Chứng chỉ' : 'Thêm Chứng chỉ mới'}
            >
                <CertificationForm 
                    initialData={editingCert}
                    onSave={handleSave} 
                    onCancel={() => { setIsFormOpen(false); setEditingCert(null); }} 
                />
            </Modal>

            <AdminHeader title="Quản lý Chứng chỉ">
                <Button onClick={() => handleOpenForm(null)} icon={FaPlus}>Thêm mới</Button>
            </AdminHeader>

            <div className="flex-grow p-4 md:p-8 pt-2">
                {isLoading && certs.length === 0 ? (
                    <LoadingSpinner text="Đang tải danh sách chứng chỉ..." />
                ) : error ? (
                    <ErrorCard statusCode={error.status} message={error.message} onRetry={fetchCerts} />
                ) : (
                    <>
                        {/* Mobile View */}
                        <div className="md:hidden space-y-4">
                            {certs.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">Chưa có chứng chỉ nào.</div>
                            ) : (
                        certs.map(cert => (
                            <div key={cert._id || cert.id} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-5 rounded-2xl border border-white/50 dark:border-gray-800/50 shadow-lg flex flex-col gap-3 transition-colors duration-300">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                    {cert.title}
                                </h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Tổ chức: <span className="font-medium text-gray-900 dark:text-white">{cert.issuer}</span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Ngày cấp: <span className="font-medium text-gray-900 dark:text-white">{cert.issueDate ? new Date(cert.issueDate).toLocaleDateString('vi-VN') : '-'}</span>
                                </div>
                                {cert.credentialUrl && (
                                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-sm mt-1">
                                        <FaExternalLinkAlt size={12} /> Link Xác thực
                                    </a>
                                )}
                                <div className="flex gap-2 justify-end mt-2">
                                    <Button variant="outline" size="sm" icon={FaEdit} onClick={() => handleOpenForm(cert)}>Sửa</Button>
                                    <Button variant="danger" size="sm" icon={FaTrash} onClick={() => triggerDelete(cert._id || cert.id)}>Xóa</Button>
                                </div>
                            </div>
                                ))
                            )}
                        </div>

                        {/* Desktop View */}
                        <div className="hidden md:block bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-800/50 shadow-2xl overflow-hidden transition-colors duration-300">
                            <table className="w-full text-left text-gray-900 dark:text-white">
                                <thead className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-600 dark:text-gray-400 border-b border-white/50 dark:border-gray-800/50 transition-colors duration-300">
                                    <tr>
                                        <th className="p-4">Chứng chỉ</th>
                                        <th className="p-4">Tổ chức cấp</th>
                                        <th className="p-4">Ngày cấp</th>
                                        <th className="p-4">Xác thực</th>
                                        <th className="p-4 text-right">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-300">
                                    {certs.length === 0 ? (
                                        <tr><td colSpan="5" className="p-8 text-center text-gray-500">Chưa có chứng chỉ nào.</td></tr>
                                    ) : (
                                certs.map(cert => (
                                    <tr key={cert._id || cert.id} className="hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-300">
                                        <td className="p-4 font-medium">{cert.title}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400">{cert.issuer}</td>
                                        <td className="p-4 text-gray-900 dark:text-white">{cert.issueDate ? new Date(cert.issueDate).toLocaleDateString('vi-VN') : '-'}</td>
                                        <td className="p-4">
                                            {cert.credentialUrl ? (
                                                <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center gap-1">
                                                    <FaExternalLinkAlt size={12} /> Link
                                                </a>
                                            ) : '-'}
                                        </td>
                                        <td className="p-4 flex justify-end gap-3">
                                            <Button variant="outline" size="sm" icon={FaEdit} onClick={() => handleOpenForm(cert)}>Sửa</Button>
                                            <Button variant="danger" size="sm" icon={FaTrash} onClick={() => triggerDelete(cert._id || cert.id)}>Xóa</Button>
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
                    title="Xóa Chứng chỉ"
                    message="Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa chứng chỉ này?"
                    confirmText="Vâng, Xóa ngay"
                    onClose={() => setConfirmModal({ isOpen: false, certId: null, isDeleting: false })}
                    onConfirm={executeDelete}
                />
            </div>
        </div>
    );
};
export default CertificationManager;