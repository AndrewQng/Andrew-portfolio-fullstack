class GetAllSkills {
    constructor({ skillRepository }) {
        this.skillRepository = skillRepository;
    }

    async execute() {
        return this.skillRepository.findAll();
    }
}

module.exports = GetAllSkills;
