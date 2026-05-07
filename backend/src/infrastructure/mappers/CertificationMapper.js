const Certification = require('../../domain/entities/Certification');

class CertificationMapper {
    static toEntity(dbModel) {
        if (!dbModel) return null;
        return new Certification({
            id: dbModel._id,
            title: dbModel.title,
            issuer: dbModel.issuer,
            issueDate: dbModel.issueDate,
            expiryDate: dbModel.expiryDate,
            credentialUrl: dbModel.credentialUrl,
            thumbnail: dbModel.thumbnail,
            description: dbModel.description
        });
    }

    static toDatabase(entity) {
        return {
            title: entity.title,
            issuer: entity.issuer,
            issueDate: entity.issueDate,
            expiryDate: entity.expiryDate,
            credentialUrl: entity.credentialUrl,
            thumbnail: entity.thumbnail,
            description: entity.description
        };
    }
}

module.exports = CertificationMapper;
