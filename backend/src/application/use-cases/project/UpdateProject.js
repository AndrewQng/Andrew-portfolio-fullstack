class UpdateProject {
    constructor({ projectRepository }) {
        this.projectRepository = projectRepository;
    }

    async execute(id, patch) {
        return this.projectRepository.update(id, patch);
    }
}

module.exports = UpdateProject;
