import { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout.jsx';
import ProjectManager from '../components/admin/ProjectManager.jsx';
import ProfileManager from '../components/admin/ProfileManager.jsx';

// Import sẵn chờ ông đắp nốt vào Sidebar
// import SkillManager from '../components/admin/SkillManager.jsx';
// import CertificationManager from '../components/admin/CertificationManager.jsx';

const AdminDashboard = () => {
    // Quản lý xem Admin đang bấm vào tab nào trên Sidebar
    const [activeTab, setActiveTab] = useState('projects');

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            
            {/* Hiển thị component tương ứng với Tab được chọn */}
            {activeTab === 'projects' && <ProjectManager />}
            
            {activeTab === 'skills' && (
                <div>
                    <h2 className="text-3xl font-bold mb-6">Quản lý Kỹ năng</h2>
                    <p className="text-gray-400">Giao diện CRUD Kỹ năng (Đang thi công...)</p>
                    {/* Bỏ 2 dòng trên và mở comment dòng dưới nếu ông đã code xong SkillManager */}
                    {/* <SkillManager /> */}
                </div>
            )}
            
            {/* Tích hợp thành công giao diện Profile ở đây */}
            {activeTab === 'profile' && <ProfileManager />}

            {/* Dành cho chứng chỉ và hành trình (Timeline) */}
            {/* {activeTab === 'certifications' && <CertificationManager />} */}

        </AdminLayout>
    );
};

export default AdminDashboard;