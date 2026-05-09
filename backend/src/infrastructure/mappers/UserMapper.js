const User = require('../../domain/entities/User');

class UserMapper {
    static toEntity(dbModel) {
        if (!dbModel) return null;
        return new User({
            id: dbModel._id,
            username: dbModel.username,
            password: dbModel.password,
            fullName: dbModel.fullName,
            brandName: dbModel.brandName,
            email: dbModel.email,
            phone: dbModel.phone,
            jobTitle: dbModel.jobTitle,
            address: dbModel.address,
            avatar: dbModel.avatar,
            resumeUrl: dbModel.resumeUrl,
            bio: dbModel.bio,
            socialLinks: dbModel.socialLinks,
            theme: dbModel.theme,
            visitorStats: dbModel.visitorStats
        });
    }

    static toDatabase(entity) {
        return {
            username: entity.username,
            password: entity.password,
            fullName: entity.fullName,
            brandName: entity.brandName,
            email: entity.email,
            phone: entity.phone,
            jobTitle: entity.jobTitle,
            address: entity.address,
            avatar: entity.avatar,
            resumeUrl: entity.resumeUrl,
            bio: entity.bio,
            socialLinks: entity.socialLinks,
            theme: entity.theme,
            visitorStats: entity.visitorStats
        };
    }
}

module.exports = UserMapper;