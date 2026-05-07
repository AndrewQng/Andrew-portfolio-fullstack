class Certification {
    constructor({
        id,
        title,
        issuer,
        issueDate,
        expiryDate,
        credentialUrl,
        thumbnail,
        description
    }) {
        this.id = id;
        this.title = title;
        this.issuer = issuer;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
        this.credentialUrl = credentialUrl;
        this.thumbnail = thumbnail;
        this.description = description;

        this.validate();
    }

    validate() {
        if (!this.title) throw new Error('Certification title is required');
        if (!this.issuer) throw new Error('Issuer is required');

        if (this.issueDate && this.expiryDate) {
            if (new Date(this.expiryDate) < new Date(this.issueDate)) {
                throw new Error('Expiry date cannot be before issue date');
            }
        }
    }
}

module.exports = Certification;