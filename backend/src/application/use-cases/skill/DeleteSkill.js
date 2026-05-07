class DeleteSkill {
    constructor({ skillRepository }) {
        this.skillRepository = skillRepository;
    }

    async execute(id) {
        return this.skillRepository.deleteById(id);
    }
}

module.exports = DeleteSkill;
