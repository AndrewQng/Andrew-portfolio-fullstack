const Skill = require('../../../domain/entities/Skill');

class CreateSkill {
    constructor({ skillRepository }) {
        this.skillRepository = skillRepository;
    }

    async execute(dto = {}) {
        const entity = new Skill({
            name: dto.name,
            category: dto.category,
            level: dto.level,
            iconUrl: dto.iconUrl,
            displayOrder: dto.displayOrder ?? 0
        });
        return this.skillRepository.create(entity);
    }
}

module.exports = CreateSkill;
