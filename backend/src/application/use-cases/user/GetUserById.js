class GetUserById {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute(id) {
        return this.userRepository.findById(id);
    }
}

module.exports = GetUserById;
