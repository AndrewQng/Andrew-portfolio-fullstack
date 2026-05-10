class SkillController {
    constructor({
        getAllSkills,
        getSkillById,
        createSkill,
        updateSkill,
        deleteSkill
    }) {
        this.getAllSkills = getAllSkills;
        this.getSkillById = getSkillById;
        this.createSkill = createSkill;
        this.updateSkill = updateSkill;
        this.deleteSkill = deleteSkill;
    }

    getAll = async (req, res) => {
        try {
            const items = await this.getAllSkills.execute();
            res.set('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=10');
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getById = async (req, res) => {
        try {
            const entity = await this.getSkillById.execute(req.params.id);
            if (!entity) return res.status(404).json({ error: 'Skill not found' });
            res.set('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=10');
            res.json(entity);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const created = await this.createSkill.execute(req.body);
            res.status(201).json(created);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req, res) => {
        try {
            const updated = await this.updateSkill.execute(req.params.id, req.body);
            if (!updated) return res.status(404).json({ error: 'Skill not found' });
            res.json(updated);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    remove = async (req, res) => {
        try {
            const ok = await this.deleteSkill.execute(req.params.id);
            if (!ok) return res.status(404).json({ error: 'Skill not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = SkillController;
