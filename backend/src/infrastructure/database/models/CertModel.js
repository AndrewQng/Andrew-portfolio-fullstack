const mongoose = require('mongoose');

const CertSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuer: { type: String, required: true }, // Tổ chức cấp (ví dụ: FPT Software, ETS)
    issueDate: { type: Date },
    expiryDate: { type: Date }, // Có thể để trống nếu ko hết hạn
    credentialUrl: { type: String }, // Link kiểm chứng chứng chỉ
    thumbnail: { type: String }, // Ảnh chụp bằng khen/chứng chỉ
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Certification', CertSchema);