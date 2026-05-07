const Skill = require('../../domain/entities/Skill');

class SkillMapper {
    static toEntity(dbModel) {
        if (!dbModel) return null;
        return new Skill({
            id: dbModel._id,
            name: dbModel.name,
            category: dbModel.category,
            level: dbModel.level,
            iconUrl: dbModel.iconUrl,
            displayOrder: dbModel.displayOrder
        });
    }

    static toDatabase(entity) {
        return {
            name: entity.name,
            category: entity.category,
            level: entity.level,
            iconUrl: entity.iconUrl,
            displayOrder: entity.displayOrder
        };
    }
}

module.exports = SkillMapper;
