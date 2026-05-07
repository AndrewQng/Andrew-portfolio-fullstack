class UpdateSkill {
    constructor({ skillRepository }) {
        this.skillRepository = skillRepository;
    }

    async execute(id, patch) {
        return this.skillRepository.update(id, patch);
    }
}

module.exports = UpdateSkill;
