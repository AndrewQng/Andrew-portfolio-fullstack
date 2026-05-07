const Project = require('../../../domain/entities/Project');

class CreateProject {
    constructor({ projectRepository }) {
        this.projectRepository = projectRepository;
    }

    async execute(dto = {}) {
        const entity = new Project({
            title: dto.title,
            slug: dto.slug,
            category: dto.category,
            role: dto.role ?? '',
            techStack: dto.techStack ?? [],
            description: (() => {
                const base = { short: '', full: '' };
                if (dto.description && typeof dto.description === 'object')
                    return { ...base, ...dto.description };
                return {
                    ...base,
                    short: dto.descriptionShort ?? base.short,
                    full: dto.descriptionFull ?? base.full
                };
            })(),
            thumbnail: dto.thumbnail,
            gallery: dto.gallery ?? [],
            metrics: dto.metrics ?? [],
            links:
                dto.links && typeof dto.links === 'object'
                    ? dto.links
                    : { repo: '', live: '', download: '' },
            status: dto.status,
            timeline: dto.timeline ?? { start: null, end: null },
            isFeatured: dto.isFeatured ?? false
        });

        return this.projectRepository.create(entity);
    }
}

module.exports = CreateProject;
