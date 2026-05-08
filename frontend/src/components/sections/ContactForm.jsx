import Input from '../ui/Input.jsx';
import TextArea from '../ui/TextArea.jsx';
import Button from '../ui/Button.jsx';
import { FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Tính năng gửi Email đang được phát triển!');
    };

    return (
        <section id="contact" className="py-20 bg-gray-900">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Kết Nối Với Tôi</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400">Bạn có dự án thú vị hoặc cơ hội hợp tác? Hãy để lại lời nhắn nhé.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Tên của bạn" placeholder="Ví dụ: John Doe" required />
                        <Input label="Email liên hệ" type="email" placeholder="john@example.com" required />
                    </div>
                    <Input label="Chủ đề" placeholder="Bạn muốn thảo luận về việc gì?" required />
                    <TextArea label="Nội dung tin nhắn" rows={5} placeholder="Nhập chi tiết lời nhắn của bạn ở đây..." required />
                    
                    <Button type="submit" variant="primary" size="lg" icon={FaPaperPlane} className="w-full">
                        Gửi Tin Nhắn
                    </Button>
                </form>
            </div>
        </section>
    );
};

// DÒNG NÀY LÀ LINH HỒN ĐỂ FIX LỖI ĐÂY ÔNG:
export default ContactForm;