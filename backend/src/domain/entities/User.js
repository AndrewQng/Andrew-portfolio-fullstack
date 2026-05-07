class User {
    constructor({
        id,
        username,
        password,
        fullName,
        email,
        phone,
        jobTitle,
        address,
        avatar,
        resumeUrl,
        bio = { short: '', full: '' },
        socialLinks = []
    }) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.jobTitle = jobTitle;
        this.address = address;
        this.avatar = avatar;
        this.resumeUrl = resumeUrl;
        this.bio = bio;
        this.socialLinks = socialLinks;

        this.validate();
    }

    validate() {
        if (!this.username) throw new Error('Username is required');
        if (!this.email || !this.email.includes('@')) throw new Error('Invalid email address');
        if (this.bio.short && this.bio.short.length > 200) {
            throw new Error('Short bio should be under 200 characters');
        }
    }

    // Logic nghiệp vụ: Ẩn các thông tin nhạy cảm khi gửi về Client
    getPublicProfile() {
        const { password, ...publicData } = this;
        return publicData;
    }
}

module.exports = User;