const mongoose = require('mongoose');
const SkillModel = require('../../database/models/SkillModel');
const SkillMapper = require('../../mappers/SkillMapper');
const Skill = require('../../../domain/entities/Skill');

class SkillRepository {
    async findAll() {
        const docs = await SkillModel.find().sort({ displayOrder: 1, name: 1 }).lean().exec();
        return docs.map((d) => SkillMapper.toEntity(d));
    }

    async findById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await SkillModel.findById(id).lean().exec();
        return SkillMapper.toEntity(doc);
    }

    async create(entity) {
        try {
            const doc = await SkillModel.create(SkillMapper.toDatabase(entity));
            return SkillMapper.toEntity(doc);
        } catch (e) {
            if (e && e.code === 11000)
                throw new Error('A skill with this name already exists');
            throw e;
        }
    }

    async update(id, patch) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const existingDoc = await SkillModel.findById(id).exec();
        if (!existingDoc) return null;

        const current = SkillMapper.toEntity(existingDoc);
        const next = new Skill({
            id: current.id,
            name: patch.name !== undefined ? patch.name : current.name,
            category: patch.category !== undefined ? patch.category : current.category,
            level: patch.level !== undefined ? patch.level : current.level,
            iconUrl: patch.iconUrl !== undefined ? patch.iconUrl : current.iconUrl,
            displayOrder:
                patch.displayOrder !== undefined
                    ? patch.displayOrder
                    : current.displayOrder
        });

        try {
            Object.assign(existingDoc, SkillMapper.toDatabase(next));
            await existingDoc.save();
            return SkillMapper.toEntity(existingDoc);
        } catch (e) {
            if (e && e.code === 11000)
                throw new Error('A skill with this name already exists');
            throw e;
        }
    }

    async deleteById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return false;
        const deleted = await SkillModel.findByIdAndDelete(id).exec();
        return !!deleted;
    }
}

module.exports = SkillRepository;
