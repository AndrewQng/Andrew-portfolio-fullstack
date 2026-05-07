const bcrypt = require('bcryptjs');
const User = require('../../../domain/entities/User');

class UpdateUser {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute(id, patch = {}) {
        const current = await this.userRepository.findById(id);
        if (!current) return null;

        let password = current.password;
        if (patch.password) password = await bcrypt.hash(patch.password, 10);

        const nextBio =
            patch.bio !== undefined && typeof patch.bio === 'object'
                ? { short: '', full: '', ...(current.bio || {}), ...patch.bio }
                : { short: '', full: '', ...(current.bio || {}) };

        const entity = new User({
            id: current.id,
            username: patch.username !== undefined ? patch.username : current.username,
            password,
            fullName: patch.fullName !== undefined ? patch.fullName : current.fullName,
            email: patch.email !== undefined ? patch.email : current.email,
            phone: patch.phone !== undefined ? patch.phone : current.phone,
            jobTitle: patch.jobTitle !== undefined ? patch.jobTitle : current.jobTitle,
            address: patch.address !== undefined ? patch.address : current.address,
            avatar: patch.avatar !== undefined ? patch.avatar : current.avatar,
            resumeUrl:
                patch.resumeUrl !== undefined ? patch.resumeUrl : current.resumeUrl,
            bio: nextBio,
            socialLinks:
                patch.socialLinks !== undefined
                    ? patch.socialLinks
                    : current.socialLinks
        });

        return this.userRepository.update(id, entity);
    }
}

module.exports = UpdateUser;
