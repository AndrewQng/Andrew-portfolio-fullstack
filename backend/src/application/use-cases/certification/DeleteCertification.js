class DeleteCertification {
    constructor({ certificationRepository }) {
        this.certificationRepository = certificationRepository;
    }

    async execute(id) {
        return this.certificationRepository.deleteById(id);
    }
}

module.exports = DeleteCertification;
