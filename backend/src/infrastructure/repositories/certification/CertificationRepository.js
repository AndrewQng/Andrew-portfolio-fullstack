const mongoose = require('mongoose');
const CertModel = require('../../database/models/CertModel');
const CertificationMapper = require('../../mappers/CertificationMapper');
const Certification = require('../../../domain/entities/Certification');

class CertificationRepository {
    async findAll() {
        const docs = await CertModel.find().sort({ createdAt: -1 }).exec();
        return docs.map((doc) => CertificationMapper.toEntity(doc));
    }

    async findById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await CertModel.findById(id).exec();
        return CertificationMapper.toEntity(doc);
    }

    async create(entity) {
        const payload = CertificationMapper.toDatabase(entity);
        const doc = await CertModel.create(payload);
        return CertificationMapper.toEntity(doc);
    }

    async update(id, patch) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const existingDoc = await CertModel.findById(id).exec();
        if (!existingDoc) return null;

        const current = CertificationMapper.toEntity(existingDoc);
        const next = new Certification({
            id: current.id,
            title: patch.title !== undefined ? patch.title : current.title,
            issuer: patch.issuer !== undefined ? patch.issuer : current.issuer,
            issueDate:
                patch.issueDate !== undefined ? patch.issueDate : current.issueDate,
            expiryDate:
                patch.expiryDate !== undefined ? patch.expiryDate : current.expiryDate,
            credentialUrl:
                patch.credentialUrl !== undefined ? patch.credentialUrl : current.credentialUrl,
            thumbnail: patch.thumbnail !== undefined ? patch.thumbnail : current.thumbnail,
            description:
                patch.description !== undefined ? patch.description : current.description
        });

        Object.assign(existingDoc, CertificationMapper.toDatabase(next));
        await existingDoc.save();
        return CertificationMapper.toEntity(existingDoc);
    }

    async deleteById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return false;
        const deleted = await CertModel.findByIdAndDelete(id).exec();
        return !!deleted;
    }
}

module.exports = CertificationRepository;
