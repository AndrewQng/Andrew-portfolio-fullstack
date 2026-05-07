class GetAllCertifications {
    constructor({ certificationRepository }) {
        this.certificationRepository = certificationRepository;
    }

    async execute() {
        return this.certificationRepository.findAll();
    }
}

module.exports = GetAllCertifications;
