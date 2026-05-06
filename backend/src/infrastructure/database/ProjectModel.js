const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, enum: ['Game', 'Mobile', 'Web', 'Art'], required: true },
    role: { type: String, required: true },
    techStack: [{ type: String }],
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    mediaGallery: [{ type: String }],
    metrics: [{ type: String }],
    repoUrl: { type: String },
    liveUrl: { type: String },
    apkDownloadUrl: { type: String },
    status: { type: String, enum: ['Completed', 'In Progress', 'Planned'], default: 'Completed' },
    startDate: { type: Date },
    endDate: { type: Date },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);