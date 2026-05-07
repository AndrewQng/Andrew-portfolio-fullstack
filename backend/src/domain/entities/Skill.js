class Skill {
    constructor({
        id,
        name,
        category,
        level,
        iconUrl,
        displayOrder = 0
    }) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.level = level;
        this.iconUrl = iconUrl;
        this.displayOrder = displayOrder;

        this.validate();
    }

    validate() {
        if (!this.name) throw new Error('Skill name is required');
        if (!this.category) throw new Error('Skill category is required');
    }
}

module.exports = Skill;