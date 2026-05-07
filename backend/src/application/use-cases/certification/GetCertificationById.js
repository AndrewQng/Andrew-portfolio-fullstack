class GetCertificationById {
    constructor({ certificationRepository }) {
        this.certificationRepository = certificationRepository;
    }

    async execute(id) {
        return this.certificationRepository.findById(id);
    }
}

module.exports = GetCertificationById;
