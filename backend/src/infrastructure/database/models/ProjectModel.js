const mongoose = require('mongoose');
const { ProjectCategory, ProjectStatus, MediaType } = require('../../../domain/entities/Enums');

// 1. Schema cho các liên kết bên ngoài
const LinkSchema = new mongoose.Schema({
    repo: { type: String, trim: true },
    live: { type: String, trim: true },
    download: { type: String, trim: true } // Link APK/File
}, { _id: false });

// 2. Schema cho mảng hình ảnh/video
const MediaSchema = new mongoose.Schema({
    url: { type: String, required: true },
    caption: { type: String },
    type: { type: String, enum: Object.values(MediaType), default: MediaType.IMAGE }
}, { _id: false });

// 3. Schema chính
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { 
        type: String, 
        enum: Object.values(ProjectCategory), // Lấy mảng ['Game', 'Mobile', 'Web', 'Art']
        required: true 
    },
    role: { type: String, trim: true },
    techStack: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    status: { 
        type: String, 
        enum: Object.values(ProjectStatus), 
        default: ProjectStatus.COMPLETED 
    },
    // Phần nội dung
    description: {
        short: { type: String, required: true },
        full: { type: String, required: true } // Nội dung Markdown/HTML
    },
    
    // Hình ảnh
    thumbnail: { type: String, required: true },
    gallery: [MediaSchema],
    
    // Thành tựu/Thông số (ví dụ: 100+ downloads)
    metrics: [{ type: String }],
    
    // Đường dẫn
    links: LinkSchema,
    
    // Thời gian và trạng thái
    timeline: {
        start: { type: Date },
        end: { type: Date }
    },
    isFeatured: { type: Boolean, default: false }
}, { 
    timestamps: true 
});

// Đánh index cho slug và title để tìm kiếm nhanh hơn
ProjectSchema.index({ slug: 1, title: 'text' });

module.exports = mongoose.model('Project', ProjectSchema);