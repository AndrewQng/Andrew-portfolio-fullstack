class Project {
    constructor({
        id,
        title,
        slug,
        category,
        role,
        techStack = [],
        description = { short: '', full: '' },
        thumbnail,
        gallery = [],
        metrics = [],
        links = { repo: '', live: '', download: '' },
        status,
        timeline = { start: null, end: null },
        isFeatured = false,
        createdAt,
        updatedAt
    }) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.category = category;
        this.role = role;
        this.techStack = techStack;
        this.description = description;
        this.thumbnail = thumbnail;
        this.gallery = gallery;
        this.metrics = metrics;
        this.links = links;
        this.status = status;
        this.timeline = timeline;
        this.isFeatured = isFeatured;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

        this.validate();
    }

    validate() {
        if (!this.title || this.title.trim().length < 2) throw new Error('Invalid project title');
        if (!this.slug) throw new Error('Project slug is required');
        
        if (this.timeline.start && this.timeline.end) {
            if (new Date(this.timeline.end) < new Date(this.timeline.start)) {
                throw new Error('End date cannot be before start date');
            }
        }
    }
}

module.exports = Project;