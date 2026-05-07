const mongoose = require('mongoose');
const { SkillCategory, SkillLevel } = require('../../../domain/entities/Enums');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, enum: Object.values(SkillCategory), required: true },
    level: { 
        type: String, 
        enum: Object.values(SkillLevel),
        default: SkillLevel.INTERMEDIATE
    },
    iconUrl: { type: String }, // Link ảnh/icon (ví dụ: icon C#, Godot)
    displayOrder: { type: Number, default: 0 } // Thứ tự hiển thị trên web
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);