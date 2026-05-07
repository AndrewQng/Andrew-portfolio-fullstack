class DeleteProject {
    constructor({ projectRepository }) {
        this.projectRepository = projectRepository;
    }

    async execute(id) {
        return this.projectRepository.deleteById(id);
    }
}

module.exports = DeleteProject;
