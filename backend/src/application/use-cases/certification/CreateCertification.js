const Certification = require('../../../domain/entities/Certification');

class CreateCertification {
    constructor({ certificationRepository }) {
        this.certificationRepository = certificationRepository;
    }

    async execute(dto = {}) {
        const entity = new Certification({
            title: dto.title,
            issuer: dto.issuer,
            issueDate: dto.issueDate,
            expiryDate: dto.expiryDate,
            credentialUrl: dto.credentialUrl,
            thumbnail: dto.thumbnail,
            description: dto.description
        });
        return this.certificationRepository.create(entity);
    }
}

module.exports = CreateCertification;
