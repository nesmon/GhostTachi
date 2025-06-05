class BaseCommand {
    constructor(value) {
        this.name = value.name;
        this.description = value.description;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }
}

module.exports = BaseCommand;