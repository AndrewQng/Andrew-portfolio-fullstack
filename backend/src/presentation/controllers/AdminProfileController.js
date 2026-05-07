class AdminProfileController {
    constructor({ getUserById, updateUser }) {
        this.getUserById = getUserById;
        this.updateUser = updateUser;
    }

    getProfile = async (req, res) => {
        try {
            const entity = await this.getUserById.execute(req.user.id);
            if (!entity)
                return res.status(401).json({ error: 'User no longer exists' });
            res.json(entity.getPublicProfile());
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    patchProfile = async (req, res) => {
        try {
            const entity = await this.updateUser.execute(req.user.id, req.body);
            if (!entity) return res.status(404).json({ error: 'User not found' });
            res.json(entity.getPublicProfile());
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = AdminProfileController;
