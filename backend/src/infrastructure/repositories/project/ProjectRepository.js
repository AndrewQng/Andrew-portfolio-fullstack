const mongoose = require('mongoose');
require('../../database/models/SkillModel');
const ProjectModel = require('../../database/models/ProjectModel');
const ProjectMapper = require('../../mappers/ProjectMapper');
const Project = require('../../../domain/entities/Project');

function mergeDescription(current, patch) {
    const base = { short: '', full: '', ...(current || {}) };
    if (!patch) return base;
    if (patch.description && typeof patch.description === 'object')
        return { ...base, ...patch.description };
    if (
        patch.descriptionShort !== undefined ||
        patch.descriptionFull !== undefined
    ) {
        return {
            ...base,
            short:
                patch.descriptionShort !== undefined ? patch.descriptionShort : base.short,
            full:
                patch.descriptionFull !== undefined ? patch.descriptionFull : base.full
        };
    }
    return base;
}

function mergeLinks(current, patch) {
    const base = { repo: '', live: '', download: '', ...(current || {}) };
    if (!patch || !patch.links || typeof patch.links !== 'object') return base;
    return { ...base, ...patch.links };
}

function mergeTimeline(current, patch) {
    const base = { start: null, end: null, ...(current || {}) };
    if (!patch || !patch.timeline || typeof patch.timeline !== 'object') return base;
    return { ...base, ...patch.timeline };
}

class ProjectRepository {
    async findAll() {
        const projects = await ProjectModel.find().populate('techStack').exec();
        return projects.map((project) => ProjectMapper.toEntity(project));
    }

    async findById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await ProjectModel.findById(id).populate('techStack').exec();
        return ProjectMapper.toEntity(doc);
    }

    async create(projectEntity) {
        try {
            const dbData = ProjectMapper.toDatabase(projectEntity);
            const doc = await ProjectModel.create(dbData);
            const populated = await ProjectModel.findById(doc._id)
                .populate('techStack')
                .exec();
            return ProjectMapper.toEntity(populated);
        } catch (e) {
            if (e && e.code === 11000)
                throw new Error('Project slug already exists');
            throw e;
        }
    }

    async update(id, patch) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const existingDoc = await ProjectModel.findById(id).exec();
        if (!existingDoc) return null;

        const current = ProjectMapper.toEntity(existingDoc);
        const nextDescription = mergeDescription(
            current.description,
            patch
        );
        const nextLinks = mergeLinks(current.links, patch);
        const nextTimeline = mergeTimeline(current.timeline, patch);

        const next = new Project({
            id: current.id,
            title: patch.title !== undefined ? patch.title : current.title,
            slug: patch.slug !== undefined ? patch.slug : current.slug,
            category: patch.category !== undefined ? patch.category : current.category,
            role: patch.role !== undefined ? patch.role : current.role,
            techStack:
                patch.techStack !== undefined ? patch.techStack : current.techStack,
            description: nextDescription,
            thumbnail:
                patch.thumbnail !== undefined ? patch.thumbnail : current.thumbnail,
            gallery: patch.gallery !== undefined ? patch.gallery : current.gallery,
            metrics: patch.metrics !== undefined ? patch.metrics : current.metrics,
            links: nextLinks,
            status: patch.status !== undefined ? patch.status : current.status,
            timeline: nextTimeline,
            isFeatured:
                patch.isFeatured !== undefined ? patch.isFeatured : current.isFeatured,
            createdAt: current.createdAt,
            updatedAt: current.updatedAt
        });

        try {
            Object.assign(existingDoc, ProjectMapper.toDatabase(next));
            await existingDoc.save();
        } catch (e) {
            if (e && e.code === 11000)
                throw new Error('Project slug already exists');
            throw e;
        }
        const populated = await ProjectModel.findById(existingDoc._id)
            .populate('techStack')
            .exec();
        return ProjectMapper.toEntity(populated);
    }

    async deleteById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return false;
        const deleted = await ProjectModel.findByIdAndDelete(id).exec();
        return !!deleted;
    }
}

module.exports = ProjectRepository;
