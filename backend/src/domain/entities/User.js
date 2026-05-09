class User {
    constructor({
        id,
        username,
        password,
        fullName,
        brandName = 'QuyenDev',
        email,
        phone,
        jobTitle,
        address,
        avatar,
        resumeUrl,
        bio = { short: '', full: '' },
        socialLinks = [],
        theme,
        visitorStats = { totalViews: 0, uniqueVisitors: 0, ips: [] }
    }) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.brandName = brandName;
        this.email = email;
        this.phone = phone;
        this.jobTitle = jobTitle;
        this.address = address;
        this.avatar = avatar;
        this.resumeUrl = resumeUrl;
        this.bio = bio;
        this.socialLinks = socialLinks;
        this.theme = theme || { 
            primaryColor: '#3b82f6', 
            secondaryColor: '#9333ea', 
            mode: 'dark',
            heroPrimary: '#3b82f6',
            heroSecondary: '#9333ea',
            aboutPrimary: '#10b981',
            aboutSecondary: '#3b82f6',
            projectsPrimary: '#f59e0b',
            projectsSecondary: '#ef4444',
            skillsPrimary: '#ec4899',
            skillsSecondary: '#8b5cf6',
            experiencePrimary: '#06b6d4',
            experienceSecondary: '#3b82f6'
        };
        this.visitorStats = visitorStats;

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