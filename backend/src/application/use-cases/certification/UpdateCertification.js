class UpdateCertification {
    constructor({ certificationRepository }) {
        this.certificationRepository = certificationRepository;
    }

    async execute(id, patch) {
        return this.certificationRepository.update(id, patch);
    }
}

module.exports = UpdateCertification;
