class ProjectController {
    constructor({
        getAllProjects,
        getProjectById,
        createProject,
        updateProject,
        deleteProject
    }) {
        this.getAllProjects = getAllProjects;
        this.getProjectById = getProjectById;
        this.createProject = createProject;
        this.updateProject = updateProject;
        this.deleteProject = deleteProject;
    }

    getAll = async (req, res) => {
        try {
            const projects = await this.getAllProjects.execute();
            res.set('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=10');
            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getById = async (req, res) => {
        try {
            const project = await this.getProjectById.execute(req.params.id);
            if (!project) return res.status(404).json({ error: 'Project not found' });
            res.set('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=10');
            res.json(project);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const project = await this.createProject.execute(req.body);
            res.status(201).json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req, res) => {
        try {
            const project = await this.updateProject.execute(
                req.params.id,
                req.body
            );
            if (!project) return res.status(404).json({ error: 'Project not found' });
            res.json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    remove = async (req, res) => {
        try {
            const ok = await this.deleteProject.execute(req.params.id);
            if (!ok) return res.status(404).json({ error: 'Project not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = ProjectController;
