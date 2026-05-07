const Project = require('../../domain/entities/Project');
const SkillMapper = require('./SkillMapper');

class ProjectMapper {
    static _techStackFromDb(items) {
        if (!Array.isArray(items)) return [];

        return items
            .map((item) => {
                if (item == null) return null;

                const hasSkillShape =
                    typeof item === 'object' &&
                    item.name !== undefined &&
                    item.name !== '' &&
                    (item._id != null || item.id != null);

                if (hasSkillShape) return SkillMapper.toEntity(item._id ? item : { ...item, _id: item.id });

                return String(item._id ?? item);
            })
            .filter((x) => x != null);
    }

    static _techStackToDatabase(items) {
        if (!Array.isArray(items)) return [];

        return items
            .map((item) => {
                if (item == null) return null;
                if (typeof item === 'string') return item;
                if (typeof item === 'object' && item.id != null) return String(item.id);
                return String(item);
            })
            .filter(Boolean);
    }

    static toEntity(dbModel) {
        if (!dbModel) return null;
        return new Project({
            id: dbModel._id,
            title: dbModel.title,
            slug: dbModel.slug,
            category: dbModel.category,
            role: dbModel.role,
            techStack: ProjectMapper._techStackFromDb(dbModel.techStack),
            description: dbModel.description,
            thumbnail: dbModel.thumbnail,
            gallery: dbModel.gallery,
            metrics: dbModel.metrics,
            links: dbModel.links,
            status: dbModel.status,
            timeline: dbModel.timeline,
            isFeatured: dbModel.isFeatured,
            createdAt: dbModel.createdAt,
            updatedAt: dbModel.updatedAt
        });
    }

    static toDatabase(entity) {
        return {
            title: entity.title,
            slug: entity.slug,
            category: entity.category,
            role: entity.role,
            techStack: ProjectMapper._techStackToDatabase(entity.techStack),
            description: entity.description,
            thumbnail: entity.thumbnail,
            gallery: entity.gallery,
            metrics: entity.metrics,
            links: entity.links,
            status: entity.status,
            timeline: entity.timeline,
            isFeatured: entity.isFeatured
        };
    }
}

module.exports = ProjectMapper;