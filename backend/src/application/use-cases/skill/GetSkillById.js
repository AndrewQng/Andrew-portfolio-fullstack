class GetSkillById {
    constructor({ skillRepository }) {
        this.skillRepository = skillRepository;
    }

    async execute(id) {
        return this.skillRepository.findById(id);
    }
}

module.exports = GetSkillById;
