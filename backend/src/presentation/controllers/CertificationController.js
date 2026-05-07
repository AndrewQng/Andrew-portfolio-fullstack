class CertificationController {
    constructor({
        getAllCertifications,
        getCertificationById,
        createCertification,
        updateCertification,
        deleteCertification
    }) {
        this.getAllCertifications = getAllCertifications;
        this.getCertificationById = getCertificationById;
        this.createCertification = createCertification;
        this.updateCertification = updateCertification;
        this.deleteCertification = deleteCertification;
    }

    getAll = async (req, res) => {
        try {
            const items = await this.getAllCertifications.execute();
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getById = async (req, res) => {
        try {
            const entity = await this.getCertificationById.execute(req.params.id);
            if (!entity) return res.status(404).json({ error: 'Certification not found' });
            res.json(entity);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const created = await this.createCertification.execute(req.body);
            res.status(201).json(created);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req, res) => {
        try {
            const updated = await this.updateCertification.execute(req.params.id, req.body);
            if (!updated) return res.status(404).json({ error: 'Certification not found' });
            res.json(updated);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    remove = async (req, res) => {
        try {
            const ok = await this.deleteCertification.execute(req.params.id);
            if (!ok) return res.status(404).json({ error: 'Certification not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = CertificationController;
