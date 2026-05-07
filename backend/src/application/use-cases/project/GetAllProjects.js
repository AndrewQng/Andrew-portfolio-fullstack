class GetAllProjects {
    constructor({ projectRepository }) {
        this.projectRepository = projectRepository;
    }

    async execute() {
        return this.projectRepository.findAll();
    }
}

module.exports = GetAllProjects;
