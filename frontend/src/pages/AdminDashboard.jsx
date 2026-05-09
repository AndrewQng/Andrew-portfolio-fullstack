import { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout.jsx';
import ProjectManager from '../components/admin/ProjectManager.jsx';
import ProfileManager from '../components/admin/ProfileManager.jsx';
import SkillManager from '../components/admin/SkillManager.jsx';
import SettingsManager from '../components/admin/SettingsManager.jsx';
import CertificationManager from '../components/admin/CertificationManager.jsx';

const AdminDashboard = () => {
    // Quản lý xem Admin đang bấm vào tab nào trên Sidebar
    const [activeTab, setActiveTab] = useState('projects');

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            
            {/* Hiển thị component tương ứng với Tab được chọn */}
            {activeTab === 'projects' && <ProjectManager />}
            
            {activeTab === 'skills' && (
                <SkillManager />
            )}
            
            {/* Tích hợp thành công giao diện Profile ở đây */}
            {activeTab === 'profile' && <ProfileManager />}

            {/* Quản lý cài đặt tông màu */}
            {activeTab === 'settings' && <SettingsManager />}

            {/* Dành cho chứng chỉ và hành trình (Timeline) */}
            {activeTab === 'certifications' && <CertificationManager />}

        </AdminLayout>
    );
};

export default AdminDashboard;